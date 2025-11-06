import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AdsAPI, AcceptAPI } from '../api'

export default function ViewAd() {
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('ts_user') || 'null')
  const [ad, setAd] = useState(null)

  useEffect(()=>{
    AdsAPI.get(id).then(res => setAd(res.data))
  }, [id])

  const accept = async () => {
    if (user.role !== 'DEVELOPER') { alert('Only developers can accept.'); return }
    const res = await AcceptAPI.apply(id, user.id)
    alert(res.data)
  }

  if (!ad) return <div className="card">Loading…</div>

  return (
    <div className="card">
      <h2>Ad #{ad.id}</h2>
      <div className="mt8"><strong>Cost:</strong> ₹ {ad.cost}</div>
      <div className="mt16"><strong>Full Description</strong><div className="mt8">{ad.fullDescription}</div></div>
      <div className="mt16"><strong>GitHub Links</strong><div className="mt8">{ad.githubLinks || '-'}</div></div>
      <div className="mt16"><strong>Requirements</strong><div className="mt8">{ad.requirements || '-'}</div></div>
      {user.role === 'DEVELOPER' && ad.status === 'ACTIVE' && (
        <button className="btn mt16" onClick={accept}>Accept Job</button>
      )}
    </div>
  )
}
