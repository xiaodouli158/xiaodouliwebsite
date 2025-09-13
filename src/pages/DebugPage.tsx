import { useState } from 'react'

function DebugPage() {
  const [selectedCategory, setSelectedCategory] = useState('common')

  const categories = [
    { id: 'common', label: '常见问题', icon: '❓' },
    { id: 'technical', label: '技术支持', icon: '🔧' },
    { id: 'performance', label: '性能优化', icon: '⚡' },
    { id: 'troubleshooting', label: '故障排除', icon: '🔍' }
  ]

  const faqData = {
    common: [
      {
        question: '如何开始我的第一次直播？',
        answer: '首先下载并安装小斗笠直播助手和OBS Studio。然后按照我们的入门教程进行基础设置，包括推流地址配置、场景设置等。'
      },
      {
        question: '支持哪些直播平台？',
        answer: '我们支持主流的直播平台，包括抖音、快手、B站、虎牙、斗鱼等。可以同时推流到多个平台。'
      },
      {
        question: '软件是否免费使用？',
        answer: '基础功能完全免费，高级功能需要订阅会员。我们提供30天免费试用期。'
      }
    ],
    technical: [
      {
        question: '推流设置参数建议',
        answer: '建议码率设置：1080p使用6000kbps，720p使用4000kbps。编码器选择x264，关键帧间隔2秒。'
      },
      {
        question: '音频同步问题解决',
        answer: '检查音频采样率是否一致（建议48kHz），调整音频延迟补偿，关闭不必要的音频处理插件。'
      },
      {
        question: '绿屏/虚拟背景设置',
        answer: '确保绿屏打光均匀，调整色键设置中的相似度和平滑度参数，建议相似度400-600。'
      }
    ],
    performance: [
      {
        question: '如何减少CPU占用率？',
        answer: '降低编码预设（如从slow改为fast），减少场景数量，关闭预览窗口，使用GPU编码。'
      },
      {
        question: '解决卡顿和掉帧问题',
        answer: '检查网络带宽，降低输出分辨率和码率，关闭其他占用网络的应用程序，使用有线网络连接。'
      },
      {
        question: '内存使用优化',
        answer: '定期重启软件，清理缓存文件，减少浏览器源的使用，关闭不必要的插件。'
      }
    ],
    troubleshooting: [
      {
        question: '无法连接到直播服务器',
        answer: '检查网络连接，确认推流地址和密钥正确，尝试更换服务器节点，检查防火墙设置。'
      },
      {
        question: '软件启动失败或崩溃',
        answer: '以管理员权限运行，更新显卡驱动，关闭杀毒软件，重新安装软件。'
      },
      {
        question: '画面黑屏或花屏',
        answer: '检查摄像头连接，更新驱动程序，尝试更换USB端口，检查摄像头兼容性。'
      }
    ]
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">技术支持</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            解决您在使用过程中遇到的各种技术问题，提供专业的故障排除指导
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 分类导航 */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">问题分类</h2>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                      selectedCategory === category.id
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span>{category.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* 联系方式 */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">联系我们</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>support@xiaodouli.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>💬</span>
                  <span>在线客服 9:00-18:00</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📱</span>
                  <span>QQ群: 123456789</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ内容 */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">
                  {categories.find(cat => cat.id === selectedCategory)?.label}
                </h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {faqData[selectedCategory as keyof typeof faqData].map((item, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <h3 className="text-lg font-medium mb-3 text-gray-900">
                        {item.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 提交问题表单 */}
            <div className="bg-white rounded-lg shadow-md mt-6 p-6">
              <h2 className="text-xl font-semibold mb-4">提交问题</h2>
              <p className="text-gray-600 mb-6">如果以上内容无法解决您的问题，请详细描述您遇到的情况</p>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">问题标题</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="简要描述您的问题"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">问题详情</label>
                  <textarea 
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="请详细描述问题的具体情况、出现频率、错误信息等"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">联系邮箱</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">问题分类</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="">选择分类</option>
                      <option value="installation">安装问题</option>
                      <option value="streaming">直播问题</option>
                      <option value="performance">性能问题</option>
                      <option value="feature">功能问题</option>
                      <option value="other">其他</option>
                    </select>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  提交问题
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DebugPage
