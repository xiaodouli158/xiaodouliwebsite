import { useAppData } from '../hooks/useAppData'
import { useState } from 'react'
import VideoModal from '../components/VideoModal'

function PluginsPage() {
  const { data, loading, error } = useAppData()
  const plugins = data?.plugins || []
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | undefined>(undefined)
  const [currentPlatform, setCurrentPlatform] = useState<string | undefined>(undefined)
  const [currentTitle, setCurrentTitle] = useState<string | undefined>(undefined)

  const handleCardClick = (item: typeof plugins[0]) => {
    if (item.workType === 'Video' && item.demoVideo) {
      setCurrentVideoUrl(item.demoVideo)
      setCurrentPlatform(item.platform)
      setCurrentTitle(item.title)
      setIsVideoOpen(true)
      return
    }
    if (item.downloadUrl) {
      window.open(item.downloadUrl, '_blank', 'noopener,noreferrer')
      return
    }
  }

  if (loading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">插件工具</h1>
            <p className="text-gray-600">从服务器获取插件/工具列表，以卡片封面展示，点击播放演示视频。</p>
          </div>
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-gray-500">加载中...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">插件工具</h1>
            <p className="text-gray-600">从服务器获取插件/工具列表，以卡片封面展示，点击播放演示视频。</p>
          </div>
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-red-500">加载插件失败，请稍后重试</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">插件工具</h1>
          <p className="text-gray-600">仅展示封面、标题和描述，点击卡片打开相应链接。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plugins.map((plugin) => (
            <div
              key={plugin.id}
              onClick={() => handleCardClick(plugin)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img 
                src={plugin.thumbnail} 
                alt={plugin.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{plugin.title}</h3>
                <p className="text-gray-600">{plugin.description}</p>
              </div>
            </div>
          ))}
        </div>

        <VideoModal 
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoUrl={currentVideoUrl}
          platform={currentPlatform}
          title={currentTitle}
        />
      </div>
    </div>
  )
}

export default PluginsPage
