import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AdsAPI } from '../api'
import AutoTextarea from '../components/AutoTextarea'

export default function EditAd() {
  const { id } = useParams()
  const nav = useNavigate()
  const [ad, setAd] = useState(null)

  useEffect(()=>{
    AdsAPI.get(id).then(res => setAd(res.data))
  }, [id])

  const save = async (e) => {
    e.preventDefault()
    await AdsAPI.update(id, ad)
    alert('Updated!')
    nav('/client')
  }

  const del = async () => {
    if (!confirm('Delete this ad?')) return
    await AdsAPI.delete(id)
    alert('Deleted.')
    nav('/client')
  }

  if (!ad) return <div className="card">Loading…</div>

  return (
    <div className="card">
      <h2>Edit Ad #{ad.id}</h2>
      <form onSubmit={save} className="grid mt16">
        <label className="label">Full Description</label>
        <AutoTextarea value={ad.fullDescription || ''} onChange={v=>setAd({...ad, fullDescription:v})} />

        <label className="label">GitHub Links</label>
        <input className="input" value={ad.githubLinks || ''} onChange={e=>setAd({...ad, githubLinks:e.target.value})} />

        <label className="label">Requirements</label>
        <AutoTextarea value={ad.requirements || ''} onChange={v=>setAd({...ad, requirements:v})} />

        <label className="label">Cost (INR)</label>
        <input type="number" className="input" value={ad.cost || 0} onChange={e=>setAd({...ad, cost:Number(e.target.value || 0)})} />

        <div className="row mt16">
          <button className="btn" type="submit">Save</button>
          <button className="btn red" type="button" onClick={del}>Delete</button>
        </div>
      </form>
    </div>
  )
}
