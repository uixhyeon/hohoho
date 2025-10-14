<template>
  <div>
    <h1>로그인 페이지</h1>
    <p>이곳에서 로그인할 수 있습니다.</p>
    <button @click="login">로그인</button>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const login = () => {
  alert("로그인완료!");
  router.push("/");
};
</script>
