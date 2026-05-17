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

  // Returns a promise that resolves once the modal closes (any outcome)
  async function openCheckout({ amountPaise, packName, onSuccess, onError }) {
    const ok = loaded.current || await loadScript()
    if (!ok || !window.Razorpay) {
      onError?.('Razorpay failed to load. Please refresh and try again.')
      return { status: 'load_error' }
    }

    return new Promise((resolve) => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amountPaise,
        currency: 'INR',
        name: 'PlacePro',
        description: `${packName} Pack — Placement Prep Kit`,
        theme: { color: '#F59E0B' },
        config: {
          display: {
            hide: [
              { method: 'paylater' },
              { method: 'upi' },
            ],
            preferences: { show_default_blocks: true },
          },
        },
        modal: {
          ondismiss() {
            resolve({ status: 'dismissed' })
          },
        },
        handler(response) {
          resolve({ status: 'success' })
          onSuccess?.(response)
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', (response) => {
        const msg = response.error?.description || 'Payment failed. Please try again.'
        resolve({ status: 'failed' })
        onError?.(msg)
      })
      rzp.open()
    })
  }

  return { openCheckout }
}
