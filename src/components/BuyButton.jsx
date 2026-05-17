import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRazorpay } from '../hooks/useRazorpay'

const DEV = import.meta.env.DEV

// amount in rupees, pack = 'starter' | 'full' | 'premium'
export default function BuyButton({ pack, amountRupees, packName, className, style, children }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { openCheckout } = useRazorpay()
  const navigate = useNavigate()

  if (DEV) {
    return (
      <button
        className={className}
        style={style}
        onClick={() => navigate(`/unlock?pack=${pack}`)}
      >
        {children}
      </button>
    )
  }

  async function handleClick() {
    setError(null)
    setLoading(true)
    await openCheckout({
      amountPaise: amountRupees * 100,
      packName,
      onSuccess(response) {
        setLoading(false)
        // Navigate to unlock page — payment captured in Razorpay dashboard
        navigate(`/unlock?pack=${pack}&payment_id=${response.razorpay_payment_id}`)
      },
      onError(msg) {
        setLoading(false)
        setError(msg)
      },
    })
    setLoading(false)
  }

  return (
    <div>
      <button
        className={className}
        style={style}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Opening...' : children}
      </button>
      {error && (
        <p className="text-red-400 text-xs mt-2 text-center">{error}</p>
      )}
    </div>
  )
}
