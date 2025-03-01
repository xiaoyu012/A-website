'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Pricing() {
  const [annual, setAnnual] = useState(true)
  
  const plans = [
    {
      name: '免费版',
      description: '体验基础的 AI 对话功能',
      price: annual ? '0' : '0',
      features: [
        '每日 10 次对话额度',
        '基础智能对话',
        '中文和英文支持',
        '内容创作功能',
        '5秒响应时间'
      ],
      highlighted: false,
      cta: '免费使用'
    },
    {
      name: '标准版',
      description: '满足个人使用的高级功能',
      price: annual ? '98' : '9.9',
      period: annual ? '/年' : '/月',
      features: [
        '每日 100 次对话额度',
        '高级智能对话',
        '多语言支持',
        '优先响应队列',
        '内容创作与润色',
        '个性化助手配置',
        '2秒响应时间'
      ],
      highlighted: true,
      cta: '开始使用'
    },
    {
      name: '专业版',
      description: '为专业用户提供的极致体验',
      price: annual ? '198' : '19.9',
      period: annual ? '/年' : '/月',
      features: [
        '无限对话额度',
        '最高级智能对话',
        '全语言支持',
        '顶级优先响应',
        '专业内容创作与润色',
        '高级个性化定制',
        '专属客服支持',
        '1秒极速响应'
      ],
      highlighted: false,
      cta: '升级专业版'
    }
  ]
  
  return (
    <div id="pricing" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">价格方案</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            选择适合您的方案
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            我们提供灵活的价格方案，满足不同用户的需求
          </p>
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="relative bg-gray-100 p-1 rounded-full flex">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                !annual ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'
              }`}
            >
              按月付费
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                annual ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'
              }`}
            >
              按年付费
              <span className="ml-1 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                省20%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`rounded-lg shadow-lg overflow-hidden relative ${
                plan.highlighted 
                  ? 'border-2 border-primary-500 transform lg:-translate-y-4' 
                  : 'border border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                  <div className="bg-primary-500 text-white text-sm font-medium py-1 px-3 rounded-full mx-auto w-max">
                    最受欢迎
                  </div>
                </div>
              )}
              <div className="p-6 bg-white">
                <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{plan.description}</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight text-gray-900">¥{plan.price}</span>
                  {plan.period && <span className="ml-1 text-xl font-medium text-gray-500">{plan.period}</span>}
                </div>
                <p className="mt-6">
                  <Link
                    href="https://ai.xiaoyulove.xyz"
                    className={`block w-full text-center rounded-md py-3 font-medium text-white ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700'
                        : 'bg-gray-800 hover:bg-gray-900'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </p>
              </div>
              <div className="px-6 pt-4 pb-8 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide">包含功能</h4>
                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 