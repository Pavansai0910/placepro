const KEY = 'placepro_access'

const PACK_RANK = { starter: 1, full: 2, premium: 3 }

export function saveAccess(pack, paymentId) {
  localStorage.setItem(KEY, JSON.stringify({ pack, paymentId, savedAt: Date.now() }))
}

export function getAccess() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// Buying "full" gives access to anything "starter" or below, etc.
export function hasAccess(pack) {
  const access = getAccess()
  if (!access || !PACK_RANK[access.pack] || !PACK_RANK[pack]) return false
  return PACK_RANK[access.pack] >= PACK_RANK[pack]
}
