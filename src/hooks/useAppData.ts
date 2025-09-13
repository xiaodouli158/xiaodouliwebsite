import React, { createContext, useContext, useEffect, useState } from 'react'

interface AppDataItem {
  id: string
  title: string
  description: string
  thumbnail: string
  category: string
  downloadUrl?: string
  demoVideo?: string
  platform?: string
  workType?: string
}

interface AppData {
  plugins: AppDataItem[]
  tools: AppDataItem[]
  tutorials: AppDataItem[]
  devices: AppDataItem[]
  updates: {
    version: string
    releaseDate: string
    downloadUrl: string
    size: string
    changelog: string[]
  }
}

type RemoteItem = {
  id?: string | number
  title?: string
  category?: string
  description?: string
  videoUrl?: string
  externalUrl?: string
  coverUrl?: string
  platform?: string
  action?: string
  workType?: string
}

type RemoteData = {
  Tutorials?: RemoteItem[]
  OBSPlugins?: RemoteItem[]
  DeviceRecommendations?: RemoteItem[]
  Ads?: RemoteItem[]
}

function mapRemoteToAppData(remote: RemoteData | null | undefined): AppData {
  const mapItems = (items?: RemoteItem[]): AppDataItem[] => {
    return (items || [])
      .map((item) => ({
        id: String(item.id ?? ''),
        title: item.title ?? '',
        description: item.description ?? '',
        thumbnail: item.coverUrl ?? '',
        category: item.category ?? '',
        demoVideo: item.videoUrl || undefined,
        downloadUrl: item.externalUrl || undefined,
        platform: item.platform || undefined,
        workType: item.workType || undefined
      }))
      .filter((i) => i.id !== '' && i.title !== '')
  }

  return {
    plugins: mapItems(remote?.OBSPlugins),
    tools: [],
    tutorials: mapItems(remote?.Tutorials),
    devices: mapItems(remote?.DeviceRecommendations),
    updates: {
      version: '',
      releaseDate: '',
      downloadUrl: '',
      size: '',
      changelog: []
    }
  }
}

type AppDataContextValue = {
  data: AppData | null
  loading: boolean
  error: string | null
}

const AppDataContext = createContext<AppDataContextValue>({
  data: null,
  loading: true,
  error: null
})

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const fetchData = async () => {
      try {
        const response = await fetch('/api/appdates.json')
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        const apiData: RemoteData = await response.json()
        if (!cancelled) setData(mapRemoteToAppData(apiData))
      } catch (err: any) {
        console.warn('Failed to fetch from API, defaulting to empty:', err)
        if (!cancelled) {
          setError(err?.message || 'fetch_error')
          setData(mapRemoteToAppData(null))
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchData()
    return () => {
      cancelled = true
    }
  }, [])

  return React.createElement(
    AppDataContext.Provider,
    { value: { data, loading, error } },
    children
  )
}

export function useAppData() {
  return useContext(AppDataContext)
}
