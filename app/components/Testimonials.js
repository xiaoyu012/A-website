'use client'

import { useState, useEffect } from 'react'

const testimonials = [
  {
    content: "小遇的智能对话能力真的很强大，能理解我复杂的问题，并给出清晰、有条理的回答，而且完全免费，已经成为我工作中不可或缺的助手。",
    author: "张先生",
    role: "上班族",
    avatar: "Z"
  },
  {
    content: "作为一名内容创作者，小遇帮助我突破创作瓶颈，提供了很多新颖的创意和表达方式，让我的文章更加生动有趣，最棒的是不需要花一分钱。",
    author: "王女士",
    role: "自媒体爱好者",
    avatar: "W"
  },
  {
    content: "以前遇到问题需要查很多资料，现在只需要问小遇就能得到全面而专业的解答，省时又省力，真的太方便了！而且是完全免费的服务！",
    author: "李同学",
    role: "学生",
    avatar: "L"
  },
  {
    content: "小遇的服务很贴心，能记住我们对话的上下文，回答越来越符合我的需求，就像有了一个专属的AI朋友，很难相信这么好的服务是免费的。",
    author: "陈女士",
    role: "自由职业者",
    avatar: "C"
  },
  {
    content: "我用小遇练习英语口语，对话非常地道，而且能够纠正我的错误，帮助我快速提高了英语水平，感谢小遇提供这么棒的免费服务。",
    author: "刘先生",
    role: "英语学习者",
    avatar: "L"
  }
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div id="testimonials" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">用户评价</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            他们都在与我聊天
          </p>
        </div>
        
        <div className="mt-12">
          <div className="hidden sm:block">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <svg className="h-8 w-8 text-primary-300 mb-4" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-gray-700 mb-4 italic">{testimonial.content}</p>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-600 flex items-center justify-center text-white font-medium">
                          {testimonial.avatar}
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="sm:hidden">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="relative">
                <svg className="h-8 w-8 text-primary-300 mb-4" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-gray-700 mb-4 italic">{testimonials[activeIndex].content}</p>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-600 flex items-center justify-center text-white font-medium">
                      {testimonials[activeIndex].avatar}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{testimonials[activeIndex].author}</p>
                    <p className="text-sm text-gray-600">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 w-2 mx-1 rounded-full transition-colors ${
                      index === activeIndex ? 'bg-primary-500' : 'bg-gray-300'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 