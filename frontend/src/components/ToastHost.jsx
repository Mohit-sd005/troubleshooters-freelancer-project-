import { useEffect, useState } from 'react'

export default function ToastHost() {
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    const h = (e) => {
      setMsg(e.detail)
      setTimeout(() => setMsg(null), 2200)
    }
    window.addEventListener('toast', h)
    return () => window.removeEventListener('toast', h)
  }, [])

  if (!msg) return null
  return (
    <div style={{
      position:'fixed', bottom:20, left:'50%', transform:'translateX(-50%)',
      background:'#111', color:'#fff', padding:'10px 14px', borderRadius:10,
      boxShadow:'0 6px 20px rgba(0,0,0,.22)', zIndex:1000
    }}>{msg}</div>
  )
}
