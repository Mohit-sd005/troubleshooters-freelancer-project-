import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AcceptAPI, AdsAPI, AuthAPI } from '../api'

export default function ViewAcceptors() {
  const { id } = useParams() // ad id
  const [acceptors, setAcceptors] = useState([])
  const [ad, setAd] = useState(null)
  const [usersById, setUsersById] = useState({})

  useEffect(()=>{
    const load = async () => {
      const [accRes, adRes] = await Promise.all([AcceptAPI.list(id), AdsAPI.get(id)])
      setAcceptors(accRes.data || [])
      setAd(adRes.data)
    }
    load()
  }, [id])

  // Tiny helper to fetch user by ID (since we don't have a /users/:id api, we’ll improvise using login-less cache)
  // If you want, we can add a simple GET /users/{id} later in backend.
  const fetchUser = async (uid) => {
    if (usersById[uid]) return usersById[uid]
    // temp hack: ask user to provide email to look up (not ideal). Better: implement GET /users/{id}
    // For now, we’ll just show IDs and let email/LinkedIn come from the acceptance email the client received.
    return null
  }

  const selectDev = async (devId) => {
    const res = await AcceptAPI.select(id, devId)
    alert(res.data) // sends mail to selected dev
  }

  return (
    <div className="card">
      <h2>Acceptors for Ad #{id}</h2>
      {!acceptors.length && <div className="mt16">No one has accepted yet.</div>}
      <div className="grid mt16">
        {acceptors.map(a => (
          <div key={a.id} className="card">
            <div><strong>Developer ID:</strong> {a.developerId}</div>
            <div className="mt8"><strong>Accepted at:</strong> {a.timestamp}</div>
            {/* In a real version, show developer name/email/linkedin by fetching user details */}
            <button className="btn mt16" onClick={()=>selectDev(a.developerId)}>Select Developer</button>
          </div>
        ))}
      </div>
    </div>
  )
}
