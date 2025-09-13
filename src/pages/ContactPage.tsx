function ContactPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">联系我们</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            有任何问题或建议？我们很乐意听到您的声音
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 联系表单 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">发送消息</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">姓名 *</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="您的姓名"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">邮箱 *</label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">主题 *</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="消息主题"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">消息类型</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="">选择类型</option>
                  <option value="general">一般咨询</option>
                  <option value="technical">技术支持</option>
                  <option value="business">商务合作</option>
                  <option value="feedback">意见反馈</option>
                  <option value="bug">问题报告</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">消息内容 *</label>
                <textarea 
                  rows={6}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="请详细描述您的问题或建议..."
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 transition-colors font-medium"
              >
                发送消息
              </button>
            </form>
          </div>

          {/* 联系信息 */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-semibold mb-6">联系方式</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">邮箱地址</h3>
                    <p className="text-gray-600">support@xiaodouli.com</p>
                    <p className="text-sm text-gray-500">我们会在24小时内回复</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">在线客服</h3>
                    <p className="text-gray-600">工作日 9:00 - 18:00</p>
                    <p className="text-sm text-gray-500">实时解答您的问题</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">社区群组</h3>
                    <p className="text-gray-600">QQ群: 123456789</p>
                    <p className="text-sm text-gray-500">与其他用户交流经验</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 工作时间 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6">工作时间</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">周一 - 周五</span>
                  <span className="text-gray-600">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">周六</span>
                  <span className="text-gray-600">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">周日</span>
                  <span className="text-gray-600">休息</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>注意：</strong> 节假日期间客服响应时间可能会延长，感谢您的理解。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ快速链接 */}
        <div className="mt-16 bg-gray-100 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center mb-8">常见问题</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">使用指南</h3>
              <p className="text-gray-600 mb-4">查看详细的使用教程和入门指南</p>
              <a href="/tutorials" className="text-primary-600 hover:text-primary-700 font-medium">
                查看教程 →
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">技术支持</h3>
              <p className="text-gray-600 mb-4">解决技术问题和故障排除</p>
              <a href="/debug" className="text-primary-600 hover:text-primary-700 font-medium">
                获取帮助 →
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">软件下载</h3>
              <p className="text-gray-600 mb-4">下载最新版本的直播工具</p>
              <a href="/downloads" className="text-primary-600 hover:text-primary-700 font-medium">
                立即下载 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
