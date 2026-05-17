import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRazorpay } from '../hooks/useRazorpay'
import { saveAccess } from '../utils/access'

const DEV = import.meta.env.DEV

// pack = 'starter' | 'full' | 'premium', amountRupees = number
export default function BuyButton({ pack, amountRupees, packName, className, style, children }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { openCheckout } = useRazorpay()
  const navigate = useNavigate()

  if (DEV) {
    return (
      <button className={className} style={style} onClick={() => navigate(`/unlock?pack=${pack}`)}>
        {children}
      </button>
    )
  }

  async function handleClick() {
    setError(null)
    setLoading(true)

    const result = await openCheckout({
      amountPaise: amountRupees * 100,
      packName,
      onSuccess(response) {
        saveAccess(pack, response.razorpay_payment_id)
        navigate(`/unlock?pack=${pack}`)
      },
      onError(msg) {
        setError(msg)
      },
    })

    // Don't reset loading on success — component unmounts via navigate()
    if (result?.status !== 'success') {
      setLoading(false)
    }
  }

  return (
    <div>
      <button className={className} style={style} onClick={handleClick} disabled={loading}>
        {loading ? 'Processing...' : children}
      </button>
      {error && (
        <p className="text-red-400 text-xs mt-2 text-center">{error}</p>
      )}
    </div>
  )
}
