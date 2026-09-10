<script setup>
import { onMounted } from "vue";
import { useAuth } from "./composables/useAuth";

const { getProfile } = useAuth();

onMounted(async () => {
  await getProfile();
});
</script>
<template>
  <router-view />
</template>
