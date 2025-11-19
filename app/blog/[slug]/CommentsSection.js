'use client';

import { useEffect, useMemo, useState } from 'react';

const DEFAULT_SETTINGS = {
  pageSize: 5,
  moderationEnabled: false,
  notificationsEnabled: true,
};

const MODERATOR_CODE = 'xiaoyu-admin';

const COLOR_PALETTE = ['#6366F1', '#0EA5E9', '#10B981', '#F59E0B', '#F97316', '#EC4899', '#A855F7', '#14B8A6'];

const STORAGE_KEYS = {
  comments: (slug) => `blog-comments:${slug}`,
  user: 'blog-comments:user',
  settings: 'blog-comments:settings',
  subscribers: (slug) => `blog-comments:subscribers:${slug}`,
  votes: (slug) => `blog-comments:votes:${slug}`,
  notifications: (slug) => `blog-comments:notifications:${slug}`,
};

const isBrowser = typeof window !== 'undefined';

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const createGuestUser = () => ({
  id: generateId(),
  name: '小访客',
  email: '',
  avatarColor: COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)],
  isModerator: false,
});

const getAvatarColor = (id = '') => {
  const total = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return COLOR_PALETTE[total % COLOR_PALETTE.length];
};

const formatDate = (value) => {
  if (!value) return '';
  try {
    const date = new Date(value);
    return `${date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })} ${date
      .toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
  } catch (_error) {
    return value;
  }
};

const buildReplies = (parentId, grouped) => {
  const children = grouped[parentId] || [];
  return children
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((child) => ({
      ...child,
      replies: buildReplies(child.id, grouped),
    }));
};

const removeThread = (list, targetId) => {
  const toRemove = new Set([targetId]);
  const collect = (id) => {
    list.forEach((comment) => {
      if (comment.parentId === id) {
        toRemove.add(comment.id);
        collect(comment.id);
      }
    });
  };
  collect(targetId);
  return list.filter((comment) => !toRemove.has(comment.id));
};

const validateEmail = (value) => /.+@.+\..+/.test(value);

export default function CommentsSection({ slug, postTitle }) {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [sortOption, setSortOption] = useState('latest');
  const [visibleCount, setVisibleCount] = useState(DEFAULT_SETTINGS.pageSize);
  const [formData, setFormData] = useState({ content: '', anonymous: false });
  const [statusMessage, setStatusMessage] = useState('');
  const [subscribers, setSubscribers] = useState([]);
  const [subscriberInput, setSubscriberInput] = useState('');
  const [votes, setVotes] = useState({});
  const [notificationLog, setNotificationLog] = useState([]);

  useEffect(() => {
    if (!isBrowser) return;

    const storedComments = window.localStorage.getItem(STORAGE_KEYS.comments(slug));
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }

    const storedUserRaw = window.localStorage.getItem(STORAGE_KEYS.user);
    if (storedUserRaw) {
      try {
        const parsedUser = JSON.parse(storedUserRaw);
        persistUser(parsedUser);
      } catch (_error) {
        const guestUser = createGuestUser();
        persistUser(guestUser);
      }
    } else {
      const guestUser = createGuestUser();
      persistUser(guestUser);
    }

    const storedSettingsRaw = window.localStorage.getItem(STORAGE_KEYS.settings);
    if (storedSettingsRaw) {
      try {
        const parsedSettings = JSON.parse(storedSettingsRaw);
        const merged = { ...DEFAULT_SETTINGS, ...parsedSettings };
        setSettings(merged);
        setVisibleCount(merged.pageSize || DEFAULT_SETTINGS.pageSize);
      } catch (_error) {
        setVisibleCount(DEFAULT_SETTINGS.pageSize);
      }
    } else {
      setVisibleCount(DEFAULT_SETTINGS.pageSize);
    }

    const storedSubscribers = window.localStorage.getItem(STORAGE_KEYS.subscribers(slug));
    if (storedSubscribers) {
      setSubscribers(JSON.parse(storedSubscribers));
    }

    const storedVotes = window.localStorage.getItem(STORAGE_KEYS.votes(slug));
    if (storedVotes) {
      setVotes(JSON.parse(storedVotes));
    }

    const storedNotifications = window.localStorage.getItem(STORAGE_KEYS.notifications(slug));
    if (storedNotifications) {
      setNotificationLog(JSON.parse(storedNotifications));
    }
  }, [slug]);

  useEffect(() => {
    if (!statusMessage) return;
    const timer = setTimeout(() => setStatusMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [statusMessage]);

  const persistComments = (updater) => {
    let nextState = [];
    setComments((prev) => {
      nextState = typeof updater === 'function' ? updater(prev) : updater;
      if (isBrowser) {
        window.localStorage.setItem(STORAGE_KEYS.comments(slug), JSON.stringify(nextState));
      }
      return nextState;
    });
    return nextState;
  };

  const persistUser = (user) => {
    if (!user) return;
    const ensuredId = user.id || generateId();
    const safeUser = {
      ...user,
      id: ensuredId,
      avatarColor: user.avatarColor || getAvatarColor(ensuredId),
    };
    setCurrentUser(safeUser);
    if (isBrowser) {
      window.localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(safeUser));
    }
  };

  const persistSettings = (nextSettings) => {
    const merged = { ...DEFAULT_SETTINGS, ...settings, ...nextSettings };
    setSettings(merged);
    if (Object.prototype.hasOwnProperty.call(nextSettings, 'pageSize')) {
      setVisibleCount(merged.pageSize);
    }
    if (isBrowser) {
      window.localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(merged));
    }
  };

  const persistSubscribers = (nextSubscribers) => {
    setSubscribers(nextSubscribers);
    if (isBrowser) {
      window.localStorage.setItem(
        STORAGE_KEYS.subscribers(slug),
        JSON.stringify(nextSubscribers)
      );
    }
  };

  const persistVotes = (nextVotes) => {
    if (isBrowser) {
      window.localStorage.setItem(STORAGE_KEYS.votes(slug), JSON.stringify(nextVotes));
    }
  };

  const persistNotifications = (updater) => {
    setNotificationLog((prev) => {
      const nextLogs = typeof updater === 'function' ? updater(prev) : updater;
      if (isBrowser) {
        window.localStorage.setItem(
          STORAGE_KEYS.notifications(slug),
          JSON.stringify(nextLogs)
        );
      }
      return nextLogs;
    });
  };

  const notifySubscribers = (comment, type = 'new-comment') => {
    if (!settings.notificationsEnabled || subscribers.length === 0) {
      return;
    }
    const actionLabel = type === 'approved' ? '审核通过' : '新评论';
    const message = `已向 ${subscribers
      .map((item) => item.email)
      .join('、')} 发送《${postTitle}》的${actionLabel}提醒（模拟）`;
    const entry = {
      id: generateId(),
      message,
      createdAt: new Date().toISOString(),
    };
    persistNotifications((prev) => [entry, ...prev].slice(0, 5));
  };

  const approvedComments = useMemo(
    () => comments.filter((comment) => comment.status === 'approved'),
    [comments]
  );

  const pendingComments = useMemo(
    () => comments.filter((comment) => comment.status === 'pending'),
    [comments]
  );

  const groupedComments = useMemo(() => {
    return approvedComments.reduce(
      (acc, comment) => {
        const parent = comment.parentId || 'root';
        if (!acc[parent]) acc[parent] = [];
        acc[parent].push(comment);
        return acc;
      },
      { root: [] }
    );
  }, [approvedComments]);

  const replyCountCache = useMemo(() => {
    const cache = {};

    const countDescendants = (id) => {
      if (cache[id] !== undefined) return cache[id];
      const children = groupedComments[id] || [];
      const total = children.reduce((sum, child) => sum + 1 + countDescendants(child.id), 0);
      cache[id] = total;
      return total;
    };

    approvedComments.forEach((comment) => {
      cache[comment.id] = countDescendants(comment.id);
    });

    return cache;
  }, [approvedComments, groupedComments]);

  const sortedTopLevel = useMemo(() => {
    const base = [...(groupedComments.root || [])];
    return base.sort((a, b) => {
      if (sortOption === 'latest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      const scoreA = (a.likes - a.dislikes) + (replyCountCache[a.id] || 0);
      const scoreB = (b.likes - b.dislikes) + (replyCountCache[b.id] || 0);
      if (scoreB === scoreA) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return scoreB - scoreA;
    });
  }, [groupedComments, replyCountCache, sortOption]);

  const displayedComments = useMemo(() => {
    const topLevel = sortedTopLevel.slice(0, visibleCount);
    return topLevel.map((comment) => ({
      ...comment,
      replies: buildReplies(comment.id, groupedComments),
    }));
  }, [groupedComments, sortedTopLevel, visibleCount]);

  const canLoadMore = (groupedComments.root || []).length > visibleCount;

  const canModerate = currentUser?.isModerator;

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (!currentUser) return;

    const trimmed = formData.content.trim();
    if (trimmed.length < 3) {
      setStatusMessage('评论内容至少3个字哦');
      return;
    }

    const newComment = {
      id: generateId(),
      parentId: null,
      content: trimmed,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      likes: 0,
      dislikes: 0,
      status: settings.moderationEnabled ? 'pending' : 'approved',
      author: {
        id: currentUser.id,
        name: formData.anonymous ? '匿名读者' : currentUser.name || '小访客',
        email: formData.anonymous ? '' : currentUser.email || '',
        avatarColor: currentUser.avatarColor || getAvatarColor(currentUser.id),
        isAnonymous: formData.anonymous,
      },
    };

    persistComments((prev) => [newComment, ...prev]);
    setFormData({ content: '', anonymous: formData.anonymous });
    setVisibleCount((prev) => prev + 1);
    setStatusMessage(settings.moderationEnabled ? '评论已提交，等待审核' : '评论发布成功');

    if (!settings.moderationEnabled) {
      notifySubscribers(newComment, 'new-comment');
    }
  };

  const handleReplySubmit = ({ parentId, content }) => {
    if (!currentUser) return false;
    const trimmed = content.trim();
    if (!trimmed) {
      setStatusMessage('回复内容不能为空');
      return false;
    }

    const reply = {
      id: generateId(),
      parentId,
      content: trimmed,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      likes: 0,
      dislikes: 0,
      status: settings.moderationEnabled ? 'pending' : 'approved',
      author: {
        id: currentUser.id,
        name: currentUser.name || '小访客',
        email: currentUser.email || '',
        avatarColor: currentUser.avatarColor || getAvatarColor(currentUser.id),
        isAnonymous: formData.anonymous,
      },
    };

    persistComments((prev) => [reply, ...prev]);
    setStatusMessage(settings.moderationEnabled ? '回复已提交待审核' : '回复发布成功');

    if (!settings.moderationEnabled) {
      notifySubscribers(reply, 'new-comment');
    }
    return true;
  };

  const handleEditComment = (commentId, newContent) => {
    const trimmed = newContent.trim();
    if (trimmed.length < 3) {
      setStatusMessage('编辑后的内容至少3个字哦');
      return;
    }
    persistComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, content: trimmed, updatedAt: new Date().toISOString() }
          : comment
      )
    );
    setStatusMessage('评论已更新');
  };

  const handleDeleteComment = (commentId) => {
    persistComments((prev) => removeThread(prev, commentId));
    setStatusMessage('评论已删除');
  };

  const handleApprove = (commentId) => {
    let approvedComment = null;
    persistComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          approvedComment = { ...comment, status: 'approved' };
          return approvedComment;
        }
        return comment;
      })
    );
    if (approvedComment) {
      notifySubscribers(approvedComment, 'approved');
    }
  };

  const handleReject = (commentId) => {
    persistComments((prev) => removeThread(prev, commentId));
  };

  const handleVote = (commentId, type) => {
    setVotes((prevVotes) => {
      const previous = prevVotes[commentId];
      if (previous === type) return prevVotes;
      const nextVotes = { ...prevVotes, [commentId]: type };
      persistVotes(nextVotes);

      persistComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id !== commentId) return comment;
          let likes = comment.likes;
          let dislikes = comment.dislikes;

          if (previous === 'like') likes = Math.max(0, likes - 1);
          if (previous === 'dislike') dislikes = Math.max(0, dislikes - 1);

          if (type === 'like') likes += 1;
          if (type === 'dislike') dislikes += 1;

          return { ...comment, likes, dislikes };
        })
      );
      return nextVotes;
    });
  };

  const handleSubscribe = (event) => {
    event.preventDefault();
    const email = subscriberInput.trim().toLowerCase();
    if (!validateEmail(email)) {
      setStatusMessage('请输入有效的邮箱地址');
      return;
    }
    if (subscribers.some((item) => item.email === email)) {
      setStatusMessage('该邮箱已订阅通知');
      return;
    }
    const entry = { id: generateId(), email, createdAt: new Date().toISOString() };
    persistSubscribers([...subscribers, entry]);
    setSubscriberInput('');
    setStatusMessage('订阅成功，将在有新评论时发送提醒（模拟）');
  };

  const handleRemoveSubscriber = (targetId) => {
    persistSubscribers(subscribers.filter((item) => item.id !== targetId));
  };

  const handleSaveProfile = () => {
    if (!currentUser) return;
    const trimmedName = currentUser.name?.trim() || '小访客';
    persistUser({ ...currentUser, name: trimmedName });
    setStatusMessage('个人资料已更新');
  };

  const handleResetProfile = () => {
    const guest = createGuestUser();
    persistUser(guest);
    setStatusMessage('已切换为访客身份');
  };

  const handleModeratorLogin = () => {
    if (!isBrowser || !currentUser) return;
    const code = window.prompt('请输入管理员口令以启用审核功能');
    if (code === MODERATOR_CODE) {
      persistUser({ ...currentUser, isModerator: true });
      setStatusMessage('已进入管理员模式');
    } else {
      setStatusMessage('口令不正确，无法进入管理员模式');
    }
  };

  const handleModeratorExit = () => {
    if (!currentUser) return;
    persistUser({ ...currentUser, isModerator: false });
    setStatusMessage('已退出管理员模式');
  };

  const toggleModeration = () => {
    if (!canModerate) return;
    persistSettings({ moderationEnabled: !settings.moderationEnabled });
  };

  const toggleNotifications = () => {
    if (!canModerate) return;
    persistSettings({ notificationsEnabled: !settings.notificationsEnabled });
  };

  const handlePageSizeChange = (event) => {
    persistSettings({ pageSize: Number(event.target.value) });
  };

  return (
    <section id="comments" className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-widest text-primary-600 font-semibold">
                评论互动
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">{postTitle} · 评论区</h2>
              <p className="text-sm text-gray-500 mt-1">
                {approvedComments.length} 条已发布 · {pendingComments.length} 条待审核
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full ${
                  settings.moderationEnabled ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                }`}
              >
                {settings.moderationEnabled ? '审核模式已开启' : '实时发布' }
              </span>
              {canModerate && (
                <button
                  onClick={toggleModeration}
                  className="inline-flex items-center px-3 py-1 rounded-full border border-gray-300 text-gray-700 hover:bg-white"
                >
                  {settings.moderationEnabled ? '关闭审核' : '开启审核'}
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">当前身份</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {currentUser?.name || '小访客'}
                    {currentUser?.isModerator && (
                      <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-primary-100 text-primary-700">
                        管理员
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  {currentUser?.isModerator ? (
                    <button
                      className="text-sm text-primary-600 hover:text-primary-700"
                      onClick={handleModeratorExit}
                    >
                      退出管理员
                    </button>
                  ) : (
                    <button
                      className="text-sm text-gray-500 hover:text-gray-700"
                      onClick={handleModeratorLogin}
                    >
                      以管理员身份登录
                    </button>
                  )}
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={handleResetProfile}
                  >
                    切换访客
                  </button>
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-gray-500">昵称</label>
                  <input
                    type="text"
                    value={currentUser?.name || ''}
                    onChange={(event) =>
                      setCurrentUser((prev) => ({
                        ...(prev || createGuestUser()),
                        name: event.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                    placeholder="请输入昵称"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">邮箱（用于识别 & 通知）</label>
                  <input
                    type="email"
                    value={currentUser?.email || ''}
                    onChange={(event) =>
                      setCurrentUser((prev) => ({
                        ...(prev || createGuestUser()),
                        email: event.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700"
                >
                  保存资料
                </button>
                <button
                  onClick={() => setFormData((prev) => ({ ...prev, anonymous: !prev.anonymous }))}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border ${
                    formData.anonymous
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  {formData.anonymous ? '匿名模式已开启' : '以实名评论'}
                </button>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={settings.notificationsEnabled}
                    onChange={toggleNotifications}
                    disabled={!canModerate}
                  />
                  启用评论通知
                </label>
              </div>
            </div>

            <form onSubmit={handleCommentSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
              <label className="block text-sm font-medium text-gray-700">发表评论</label>
              <textarea
                value={formData.content}
                onChange={(event) => setFormData({ ...formData, content: event.target.value })}
                rows={4}
                maxLength={1000}
                className="mt-3 w-full rounded-2xl border border-gray-200 p-4 focus:border-primary-500 focus:ring-primary-500"
                placeholder="分享你的想法、经验或疑问..."
              />
              <div className="mt-3 flex flex-wrap items-center justify-between text-sm text-gray-500">
                <span>{formData.content.trim().length} / 1000</span>
                <button
                  type="submit"
                  className="inline-flex items-center px-5 py-2 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700"
                >
                  发布评论
                </button>
              </div>
            </form>

            {statusMessage && (
              <div className="rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary-700">
                {statusMessage}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
              <div className="inline-flex items-center gap-2 bg-white rounded-full border border-gray-200 px-2 py-1">
                {['latest', 'hot'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`px-3 py-1 rounded-full font-medium ${
                      sortOption === option
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setSortOption(option)}
                  >
                    {option === 'latest' ? '最新优先' : '最热优先'}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <label className="text-gray-500">每页显示</label>
                <select
                  value={settings.pageSize}
                  onChange={handlePageSizeChange}
                  className="rounded-lg border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  {[5, 10, 20].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {displayedComments.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-500">还没有评论，快来占领沙发吧~</p>
                </div>
              ) : (
                displayedComments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    depth={0}
                    currentUser={currentUser}
                    onReply={handleReplySubmit}
                    onEdit={handleEditComment}
                    onDelete={handleDeleteComment}
                    onVote={handleVote}
                    votes={votes}
                  />
                ))
              )}
            </div>

            {canLoadMore && (
              <div className="text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + settings.pageSize)}
                  className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-white"
                >
                  加载更多评论
                </button>
              </div>
            )}

            {canModerate && settings.moderationEnabled && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">审核队列</h3>
                  <span className="text-sm text-gray-500">{pendingComments.length} 条待处理</span>
                </div>
                {pendingComments.length === 0 ? (
                  <p className="mt-4 text-sm text-gray-500">暂无待审核评论</p>
                ) : (
                  <div className="mt-4 space-y-4">
                    {pendingComments.map((comment) => (
                      <div key={comment.id} className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{comment.author.name}</p>
                            <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(comment.id)}
                              className="px-3 py-1 rounded-full bg-primary-600 text-white text-xs"
                            >
                              通过
                            </button>
                            <button
                              onClick={() => handleReject(comment.id)}
                              className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs"
                            >
                              拒绝
                            </button>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-gray-700 whitespace-pre-line">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">邮件通知</h3>
                  <p className="text-sm text-gray-500">订阅后将收到新评论提醒（演示用，无真实发送）</p>
                </div>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={subscriberInput}
                    onChange={(event) => setSubscriberInput(event.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700"
                  >
                    订阅提醒
                  </button>
                </form>
              </div>
              {subscribers.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2">已订阅邮箱</p>
                  <div className="flex flex-wrap gap-2">
                    {subscribers.map((item) => (
                      <span
                        key={item.id}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs"
                      >
                        {item.email}
                        {canModerate && (
                          <button
                            type="button"
                            className="text-gray-400 hover:text-gray-700"
                            onClick={() => handleRemoveSubscriber(item.id)}
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {notificationLog.length > 0 && (
                <div className="mt-4 border-t border-dashed pt-4">
                  <p className="text-xs text-gray-500 mb-2">最近通知记录（模拟）</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {notificationLog.map((entry) => (
                      <li key={entry.id} className="flex flex-col">
                        <span>{entry.message}</span>
                        <span className="text-xs text-gray-400">{formatDate(entry.createdAt)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommentItem({
  comment,
  depth,
  currentUser,
  onReply,
  onEdit,
  onDelete,
  onVote,
  votes,
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyValue, setReplyValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);

  useEffect(() => {
    setEditValue(comment.content);
  }, [comment.content]);

  const canEdit = currentUser && (currentUser.isModerator || currentUser.id === comment.author.id);

  const hasVoted = votes[comment.id];

  const submitReply = () => {
    const success = onReply({ parentId: comment.id, content: replyValue });
    if (success) {
      setReplyValue('');
      setIsReplying(false);
    }
  };

  const submitEdit = () => {
    onEdit(comment.id, editValue);
    setIsEditing(false);
  };

  return (
    <div className={`bg-white border border-gray-100 rounded-2xl p-5 ${depth > 0 ? 'ml-6 sm:ml-10' : ''}`}>
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ backgroundColor: comment.author.avatarColor || '#6366F1' }}
        >
          {(comment.author.name || '友').slice(0, 1).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-gray-900">{comment.author.name}</p>
            <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
            {comment.updatedAt && (
              <span className="text-xs text-gray-400">已编辑</span>
            )}
          </div>

          {isEditing ? (
            <div className="mt-3 space-y-3">
              <textarea
                value={editValue}
                onChange={(event) => setEditValue(event.target.value)}
                className="w-full rounded-xl border border-gray-200 p-3 focus:border-primary-500 focus:ring-primary-500"
                rows={3}
              />
              <div className="flex gap-3 text-sm">
                <button
                  onClick={submitEdit}
                  className="px-4 py-1.5 rounded-full bg-primary-600 text-white"
                >
                  保存
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditValue(comment.content);
                  }}
                  className="px-4 py-1.5 rounded-full border border-gray-200"
                >
                  取消
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-gray-700 whitespace-pre-line">{comment.content}</p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <button
              type="button"
              onClick={() => onVote(comment.id, 'like')}
              className={`flex items-center gap-1 ${hasVoted === 'like' ? 'text-primary-600 font-semibold' : ''}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 9V5a3 3 0 00-6 0v4H5.5A1.5 1.5 0 004 10.5v7A1.5 1.5 0 005.5 19H14m0 0h2.586a1 1 0 00.707-1.707L14 12.414M14 19v-6"
                />
              </svg>
              赞同 {comment.likes}
            </button>
            <button
              type="button"
              onClick={() => onVote(comment.id, 'dislike')}
              className={`flex items-center gap-1 ${
                hasVoted === 'dislike' ? 'text-red-600 font-semibold' : ''
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 15v4a3 3 0 006 0v-4h2.5a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0018.5 5H10m0 0H7.414a1 1 0 00-.707 1.707L10 11.586M10 5v6"
                />
              </svg>
              反对 {comment.dislikes}
            </button>
            <button
              type="button"
              onClick={() => setIsReplying((prev) => !prev)}
              className="hover:text-primary-600"
            >
              回复
            </button>
            {canEdit && (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="hover:text-primary-600"
                >
                  编辑
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(comment.id)}
                  className="hover:text-red-600"
                >
                  删除
                </button>
              </>
            )}
          </div>

          {isReplying && (
            <div className="mt-4">
              <textarea
                value={replyValue}
                onChange={(event) => setReplyValue(event.target.value)}
                rows={3}
                className="w-full rounded-xl border border-gray-200 p-3 focus:border-primary-500 focus:ring-primary-500"
                placeholder={`回复 @${comment.author.name}`}
              />
              <div className="mt-2 flex gap-3 text-sm">
                <button
                  onClick={submitReply}
                  className="px-4 py-1.5 rounded-full bg-primary-600 text-white"
                >
                  发布回复
                </button>
                <button
                  onClick={() => {
                    setIsReplying(false);
                    setReplyValue('');
                  }}
                  className="px-4 py-1.5 rounded-full border border-gray-200"
                >
                  取消
                </button>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-5 space-y-4">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  depth={depth + 1}
                  currentUser={currentUser}
                  onReply={onReply}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onVote={onVote}
                  votes={votes}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
