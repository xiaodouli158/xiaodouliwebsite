import { useAppData } from '../hooks/useAppData'

function TutorialsPage() {
  const { data, loading, error } = useAppData()
  const tutorials = data?.tutorials || []

  const handleCardClick = (item: typeof tutorials[0]) => {
    if (item.workType === 'Video' && item.demoVideo) {
      window.open(item.demoVideo, '_blank', 'noopener,noreferrer')
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">使用教程</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              加载中...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">使用教程</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              加载失败，请稍后重试
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">使用教程</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            从入门到精通，详细的分步指南帮助您掌握直播技巧
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
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
      </div>
    </div>
  )
}

export default TutorialsPage
