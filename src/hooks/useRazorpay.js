import { useEffect, useRef } from 'react'

const SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js'

function loadScript() {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.src = SCRIPT_URL
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export function useRazorpay() {
  const loaded = useRef(false)

  useEffect(() => {
    loadScript().then((ok) => { loaded.current = ok })
  }, [])

  async function openCheckout({ amountPaise, packName, onSuccess, onError }) {
    const ok = loaded.current || await loadScript()
    if (!ok || !window.Razorpay) {
      onError?.('Razorpay failed to load. Please refresh and try again.')
      return
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amountPaise,
      currency: 'INR',
      name: 'PlacePro',
      description: `${packName} — Placement Prep Kit`,
      image: '',
      theme: { color: '#F59E0B' },
      modal: {
        backdropclose: false,
        escape: true,
      },
      prefill: {},
      handler(response) {
        // response contains payment_id — no server verification in this setup
        onSuccess?.(response)
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', (response) => {
      onError?.(response.error?.description || 'Payment failed. Please try again.')
    })
    rzp.open()
  }

  return { openCheckout }
}
