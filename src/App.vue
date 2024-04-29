<script setup>

import { isLoggedIn } from "@/service/AuthService";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

onMounted(() => {
    if (!isLoggedIn()) {
        router.push('/auth/login');
    }
});

const router = useRouter();

const logoutUser = () => {
    localStorage.removeItem('user');
    router.push('/login');
};

</script>

<template>
    <router-view />
</template>

<style scoped></style>
