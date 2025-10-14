<template>
  <div>
    <h1>회원가입</h1>
    <p>회원가입을 진행해주세요</p>
    <button @click="goToLogin">회원가입하기</button>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
// useRouter() 이동할때 사용하는 함수
const router = useRouter();
const goToLogin = () => {
  alert("회원가입완료");
  router.push("/login");
};
</script>
