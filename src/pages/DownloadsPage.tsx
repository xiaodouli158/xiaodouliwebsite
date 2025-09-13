function DownloadsPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">下载直播软件</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            获取最新版本的直播工具软件，提升您的直播体验。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* 小斗笠直播助手 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">小斗笠直播助手</h2>
                  <p className="text-gray-600">
                    主要的直播助手应用程序，具有覆盖层管理、聊天集成和直播分析功能。
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <a 
                    href="https://xiaodouliupdates.wzyclouds.dpdns.org/小斗笠直播助手-Setup-2.0.0.exe" 
                    className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    立即下载
                  </a>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-4 text-sm">
                <span className="bg-gray-100 px-4 py-2 rounded-full">版本: 2.0.0</span>
                <span className="bg-gray-100 px-4 py-2 rounded-full">大小: 200.13 MB</span>
                <span className="bg-gray-100 px-4 py-2 rounded-full">系统: Windows</span>
                <span className="bg-gray-100 px-4 py-2 rounded-full">发布时间: 2025/6/10</span>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">主要功能:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                  <li>实时直播数据分析</li>
                  <li>自定义覆盖层管理</li>
                  <li>多平台聊天集成</li>
                  <li>自动化提醒和通知</li>
                  <li>直播计划和提醒功能</li>
                </ul>
              </div>
            </div>
          </div>

          {/* OBS Studio */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">OBS Studio</h2>
                  <p className="text-gray-600">
                    免费开源的直播和录制软件，支持多平台直播推流和本地录制。
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <a 
                  className="p-4 border rounded hover:bg-gray-50 text-center transition-colors" 
                  href="https://mirrors.tuna.tsinghua.edu.cn/github-release/obsproject/obs-studio/LatestRelease/OBS-Studio-31.0.3-Windows-Installer.exe"
                >
                  🪟 Windows 下载
                </a>
                <a 
                  className="p-4 border rounded hover:bg-gray-50 text-center transition-colors" 
                  href="https://mirrors.tuna.tsinghua.edu.cn/github-release/obsproject/obs-studio/LatestRelease/OBS-Studio-31.0.3-macOS-Apple.dmg"
                >
                  🍎 macOS (Apple) 下载
                </a>
                <a 
                  className="p-4 border rounded hover:bg-gray-50 text-center transition-colors" 
                  href="https://mirrors.tuna.tsinghua.edu.cn/github-release/obsproject/obs-studio/LatestRelease/OBS-Studio-31.0.3-macOS-Intel.dmg"
                >
                  🍎 macOS (Intel) 下载
                </a>
                <a 
                  className="p-4 border rounded hover:bg-gray-50 text-center transition-colors" 
                  href="https://mirrors.tuna.tsinghua.edu.cn/github-release/obsproject/obs-studio/LatestRelease/OBS-Studio-31.0.3-Ubuntu-24.04-x86_64.deb"
                >
                  🐧 Ubuntu/Linux 下载
                </a>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                版本: 31.0.3 · 发布时间: 2025/3/28
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadsPage
