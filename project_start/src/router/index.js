import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Information from "@/views/Information.vue";
import Reservation from "@/views/Reservation.vue";
import Community from "@/views/Community.vue";
import BookNow from "@/views/booking/BookNow.vue";
import ChangeBooking from "@/views/booking/ChangeBooking.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import Promotion from "@/views/Promotion.vue";
import Support from "@/views/Support.vue";
const routes = [
  { path: "/", component: HomeView },
  { path: "/information", component: Information },
  { path: "/reservation", component: Reservation },
  { path: "/community", component: Community },
  { path: "/booknow", component: BookNow },
  { path: "/changebooking", component: ChangeBooking },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/promotion", component: Promotion},
  { path: "/support", component: Support}
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
