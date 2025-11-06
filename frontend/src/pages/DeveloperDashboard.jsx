import { useEffect, useState } from 'react'
import { AdsAPI } from '../api'
import AdCard from '../components/AdCard'

export default function DeveloperDashboard() {
  const [ads, setAds] = useState([])

  useEffect(()=>{
    AdsAPI.active().then(res => setAds(res.data || []))
  }, [])

  return (
    <div className="grid">
      {ads.length === 0 && <div className="card">No active ads.</div>}
      {ads.map(ad => <AdCard key={ad.id} ad={ad} />)}
    </div>
  )
}
