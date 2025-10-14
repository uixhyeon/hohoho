import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import About from "@/views/Information.vue";
import Login from "@/views/Login.vue";
import Review from "@/views/community.vue";
import Singup from "@/views/Singup.vue";
import Menu from "@/views/Reservation.vue";
import Submenu1 from "@/views/submenu/Submenu1.vue";
import Submenu2 from "@/views/submenu/Submenu2.vue";
import Submenu3 from "@/views/submenu/Submenu3.vue";
const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: About },
  { path: "/login", component: Login },
  { path: "/singup", component: Singup },
  { path: "/menu", component: Menu },
  { path: "/review", component: Review },
  { path: "/submenu1", component: Submenu1 },
  { path: "/submenu2", component: Submenu2 },
  { path: "/submenu3", component: Submenu3 },
];
// 라우터 만들기 (길 안내 지도 같은 것)
// createRouter() → "길을 만드는 도구"
const router = createRouter({
  // createWebHistory() → 브라우저 주소창에 /home , /about 같은 주소를 보여줌
  history: createWebHistory(), // 브라우저 주소 표시줄에 경로가 보이게 함 (깜짝 주소 안 쓰고 진짜 주소처럼 보이게!)

  // routes → 우리가 정해둔 길(페이지들)을 가져다 씀
  routes, // 경로 정의 ("/home" 가면 Home.vue , "/about" 가면 About.vue)
});

// 다른 파일에서도 이 router를 쓸 수 있게 내보내기
export default router;
