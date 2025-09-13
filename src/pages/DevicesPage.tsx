import { useAppData } from '../hooks/useAppData'

function DevicesPage() {
  const { data } = useAppData()
  const devices = data?.devices || []

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">设备推荐</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            专业建议，为您的直播设置推荐最佳的摄像头、麦克风、灯光和其他设备
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.downloadUrl) {
                  window.open(item.downloadUrl, '_blank', 'noopener,noreferrer')
                }
              }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 简化，无额外组件 */}
      </div>
    </div>
  )
}

export default DevicesPage
