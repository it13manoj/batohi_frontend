import api from '@/config/api'

const STRIPE_SCRIPT_URL = 'https://js.stripe.com/v3/'

const getCheckoutData = response => {
  const candidates = [
    response?.data?.data,
    response?.data?.checkoutSession,
    response?.data?.session,
    response?.data?.checkout,
    response?.data,
    response
  ]

  for (const candidate of candidates) {
    if (candidate && typeof candidate === 'object') {
      return candidate
    }
  }

  return {}
}

const extractCheckoutUrl = data => {
  if (!data || typeof data !== 'object') return ''

  const possible = [
    data.url,
    data.checkoutUrl,
    data.redirectUrl,
    data.paymentUrl,
    data.session?.url,
    data.session?.checkoutUrl,
    data.checkout?.url,
    data.checkout?.checkoutUrl,
    data.data?.url,
    data.data?.checkoutUrl,
    data.data?.redirectUrl,
    data.data?.session?.url,
    data.data?.session?.checkoutUrl,
    data.session_url,
    data.checkout_url,
    data.payment_url
  ]

  return possible.find(value => typeof value === 'string' && value.trim()) || ''
}

const extractSessionId = data => {
  if (!data || typeof data !== 'object') return ''

  const possible = [
    data.sessionId,
    data.session_id,
    data.id,
    data.checkoutSessionId,
    data.checkout_session_id,
    data.session?.id,
    data.session?.sessionId,
    data.data?.sessionId,
    data.data?.session_id,
    data.data?.id,
    data.checkout?.id,
    data.checkout?.sessionId,
    data.checkout?.session_id
  ]

  return possible.find(value => typeof value === 'string' && value.trim()) || ''
}

export const loadStripe = async (publishableKey = '') => {
  if (typeof window === 'undefined') return null

  if (window.Stripe) return window.Stripe

  const key = publishableKey || window.__BATOHI_STRIPE_KEY__ || ''

  if (!key) {
    await new Promise((resolve, reject) => {
      const existing = document.querySelector(
        'script[src="https://js.stripe.com/v3/"]'
      )
      if (existing) {
        existing.addEventListener('load', resolve, { once: true })
        existing.addEventListener('error', reject, { once: true })
        return
      }

      const script = document.createElement('script')
      script.src = STRIPE_SCRIPT_URL
      script.async = true
      script.onload = resolve
      script.onerror = reject
      document.head.appendChild(script)
    }).catch(() => null)

    if (window.Stripe) return window.Stripe
    return null
  }

  await new Promise((resolve, reject) => {
    const existing = document.querySelector(
      'script[src="https://js.stripe.com/v3/"]'
    )
    if (existing) {
      existing.addEventListener('load', resolve, { once: true })
      existing.addEventListener('error', reject, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = STRIPE_SCRIPT_URL
    script.async = true
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  }).catch(() => null)

  if (!window.Stripe) return null
  return window.Stripe(key)
}

export const createStripeCheckoutSession = async payload => {
  const endpoints = [
    '/driver/payments/create-checkout-session',
    '/driver/payment/create-checkout-session',
    '/driver/payments/stripe/create-checkout-session',
    '/driver/payments/stripe/checkout',
    '/driver/create-checkout-session',
    '/driver/create-checkout-session',
    '/driver/stripe/checkout',
    '/driver/stripe/create-checkout-session',
    '/driver/stripe/session',
    '/driver/stripe/create-session',
    '/driver/stripe/checkout',
    '/driver/stripe/create-checkout-session',
    '/driver/checkout-session/create',
    '/driver/payment/stripe/create-checkout-session'
  ]

  let lastError = null

  for (const endpoint of endpoints) {
    try {
      const response = await api.post(endpoint, payload)
      const data = getCheckoutData(response)
      const checkoutUrl = extractCheckoutUrl(data)
      const sessionId = extractSessionId(data)

      if (checkoutUrl || sessionId) {
        return {
          ...data,
          url: checkoutUrl || data?.url || '',
          checkoutUrl: checkoutUrl || data?.checkoutUrl || '',
          sessionId: sessionId || data?.sessionId || '',
          session_id: sessionId || data?.session_id || '',
          id: data?.id || sessionId || ''
        }
      }
    } catch (error) {
      lastError = error
    }
  }

  if (lastError) throw lastError
  throw new Error('Stripe checkout session could not be created.')
}

export const redirectToStripeCheckout = async data => {
  const checkoutUrl = extractCheckoutUrl(data)

  if (checkoutUrl) {
    window.location.href = checkoutUrl
    return true
  }

  const sessionId = extractSessionId(data)

  if (sessionId) {
    const stripe = await loadStripe()
    if (stripe && typeof stripe.redirectToCheckout === 'function') {
      await stripe.redirectToCheckout({ sessionId })
      return true
    }
  }

  return false
}
