<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from './composables/useAuth'

const route = useRoute()
const router = useRouter()
const { getProfile } = useAuth()

const isStripeSuccessRedirect = query => {
  if (!query || typeof query !== 'object') return false

  return (
    query.success === 'true' ||
    query.success === true ||
    query.payment_status === 'paid' ||
    query.status === 'success' ||
    query.result === 'success' ||
    !!query.checkout_session_id ||
    !!query.checkoutSessionId ||
    !!query.session_id ||
    !!query.sessionId
  )
}

onMounted(async () => {
  const query = route?.query || {}

  if (isStripeSuccessRedirect(query)) {
    const target = {
      name: 'DriverSubscriptionSuccess',
      query,
      replace: true
    }

    await router.replace(target)
    return
  }

  await getProfile()
})
</script>
<template>
  <router-view />
</template>
