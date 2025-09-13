import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            提升您的直播体验
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            为各个级别的主播提供专业工具、教程和支持
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/downloads" 
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium text-lg transition-colors"
            >
              下载软件
            </Link>
            <Link 
              to="/tutorials" 
              className="border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium text-lg transition-colors"
            >
              查看教程
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">专业直播所需的一切工具</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 - 使用教程 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">使用教程</h3>
              <p className="text-gray-600 mb-4">
                详细的分步指南，帮助您设置直播、优化设置并创建引人入胜的内容。
              </p>
              <Link 
                to="/tutorials" 
                className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
              >
                观看教程
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature 2 - 插件工具 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">插件工具</h3>
              <p className="text-gray-600 mb-4">
                强大的软件工具，提升您的直播质量，管理覆盖层，并与观众互动。
              </p>
              <Link 
                to="/plugins" 
                className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
              >
                查看插件
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature 3 - 设备推荐 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">设备推荐</h3>
              <p className="text-gray-600 mb-4">
                专业建议，为您的直播设置推荐最佳的摄像头、麦克风、灯光和其他设备。
              </p>
              <Link 
                to="/devices" 
                className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
              >
                查看推荐
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature 4 - 更多 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">更多</h3>
              <p className="text-gray-600 mb-4">
                更多功能和服务，包括技术支持、故障排除和直播性能优化等。
              </p>
              <Link 
                to="/contact" 
                className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
              >
                了解更多
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
