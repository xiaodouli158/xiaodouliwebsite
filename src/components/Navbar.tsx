import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/downloads', label: '下载软件' },
    { path: '/plugins', label: '插件工具' },
    { path: '/tutorials', label: '使用教程' },
    { path: '/devices', label: '设备推荐' },
    { path: '/debug', label: '技术支持' },
  ]

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/icons/icon-32x32.ico" 
              alt="小斗笠直播工具" 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold">小斗笠直播工具</span>
          </Link>
          
          <div className="hidden md:flex space-x-8 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  isActive(item.path)
                    ? 'text-primary-600 font-medium'
                    : 'text-gray-600 hover:text-primary-600'
                } transition-colors`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button - placeholder for future implementation */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-primary-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
