import { useEffect } from 'react'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl?: string
  platform?: string
  title?: string
}

function VideoModal({ isOpen, onClose, videoUrl, platform, title }: VideoModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const extractVideoId = (url: string, platform?: string): string | null => {
    if (!url) return null
    
    let p = platform
    if (!p) {
      if (url.includes('douyin.com') || url.includes('dy.com')) p = 'douyin'
      else if (url.includes('bilibili.com')) p = 'bilibili'
      else if (url.includes('youtube.com') || url.includes('youtu.be')) p = 'youtube'
      else if (url.includes('kuaishou.com')) p = 'kuaishou'
    }
    
    if (p === 'douyin') {
      const patterns = [/\/(\d{19})\/?/, /\/(\d{18})\/?/, /\/(\d{17})\/?/, /video[\/=](\d+)/i, /v[\/=](\d+)/i]
      for (const pattern of patterns) {
        const m = url.match(pattern)
        if (m && m[1]) return m[1]
      }
      const filename = url.split('/').pop() || ''
      const fm = filename.match(/(\d{17,19})/)
      if (fm) return fm[1]
    }
    
    return null
  }

  const buildPlayerUrl = (videoUrl: string, platform?: string): string | null => {
    if (!videoUrl) return null
    
    let p = platform
    if (!p) {
      if (videoUrl.includes('douyin.com') || videoUrl.includes('dy.com')) p = 'douyin'
      else if (videoUrl.includes('bilibili.com')) p = 'bilibili'
      else if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) p = 'youtube'
      else if (videoUrl.includes('kuaishou.com')) p = 'kuaishou'
    }
    
    const id = extractVideoId(videoUrl, p || 'douyin')
    if (!id) return null
    if (p === 'douyin') return `https://open.douyin.com/player/video?vid=${id}&autoplay=0`
    return null
  }

  if (!isOpen) return null

  const playerUrl = videoUrl ? buildPlayerUrl(videoUrl, platform) : null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl h-full max-h-[95vh] bg-gray-900 rounded-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors shadow-lg"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Header */}
        {title && (
          <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
            <h3 className="text-white font-semibold truncate">{title}</h3>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 min-h-0">
          {playerUrl ? (
            <iframe
              src={playerUrl}
              className="w-full h-full border-0"
              allowFullScreen
              title={title || '视频播放器'}
              style={{ minHeight: '500px' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white p-6">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold mb-2">无法播放视频</h3>
              <p className="text-gray-400 text-sm text-center">
                无法从视频URL中提取播放信息，或暂不支持该平台的视频播放
              </p>
              {videoUrl && (
                <div className="mt-4 text-xs text-gray-500">
                  VideoUrl: {videoUrl}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoModal
