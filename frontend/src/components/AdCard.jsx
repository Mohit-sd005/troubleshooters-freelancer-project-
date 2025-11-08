import { Link } from 'react-router-dom'

export default function AdCard({ ad }) {
  const preview =
    (ad.fullDescription || '').slice(0, 120) +
    ((ad.fullDescription || '').length > 120 ? '…' : '')

  return (
    <div className="card" style={{ width: '100%' }}>
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div className="mb8"><strong>Ad #{ad.id}</strong></div>
          <div className="mb8">{preview}</div>
          <div className="badge">Status: {ad.status}</div>
        </div>
        <div className="price">₹ {ad.cost}</div>
      </div>
      <div className="mt16">
        {/* ✅ Correct: points to /ad/:id */}
        <Link to={`/ad/${ad.id}`} className="btn light">View Full Ad</Link>
      </div>
    </div>
  )
}
