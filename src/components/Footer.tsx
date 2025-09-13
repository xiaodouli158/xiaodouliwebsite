import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="mb-4 flex items-center space-x-3">
              <img 
                src="/icons/icon-32x32.ico" 
                alt="小斗笠直播工具" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold">小斗笠直播工具</span>
            </Link>
            <p className="text-sm text-gray-600">
              您的终极直播伴侣。通过我们的工具和资源提升您的直播体验。
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-600">首页</Link>
              </li>
              <li>
                <Link to="/downloads" className="text-gray-600 hover:text-primary-600">下载软件</Link>
              </li>
              <li>
                <Link to="/plugins" className="text-gray-600 hover:text-primary-600">插件工具</Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-gray-600 hover:text-primary-600">使用教程</Link>
              </li>
              <li>
                <Link to="/devices" className="text-gray-600 hover:text-primary-600">设备推荐</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">支持</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/debug" className="text-gray-600 hover:text-primary-600">技术支持</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary-600">联系我们</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">关注我们</h3>
            <div className="flex space-x-4 text-gray-600">
              <span>Facebook</span>
              <span>Twitter</span>
              <span>Instagram</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
          © 2025 小斗笠直播工具. 保留所有权利.
        </div>
      </div>
    </footer>
  )
}

export default Footer
