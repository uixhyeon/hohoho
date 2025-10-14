<template>
  <nav>
    <router-link to="/" class="logo">홈(logo)</router-link>
    <div class="menu">
      <router-link to="/information">information(이용안내)</router-link>
      <router-link to="/promotion">promotion(혜택)</router-link>
      <router-link to="/reservation" class="dropdown"
        >reservation(예약)
        <ul class="submenu">
          <li><router-link to="/booknow">booknow</router-link></li>
          <li><router-link to="/changebooking">changebooking</router-link></li>
        </ul>
      </router-link>
      
      <router-link to="/community">community(커뮤니티)</router-link>
      <router-link to="/support">support(고객센터)</router-link>
    </div>

    <div class="login">
      <router-link to="/login">로그인</router-link>
      <router-link to="/singup">회원가입</router-link>
    </div>
  </nav>
</template>
<style scoped>
.logo {
  width: 10%;
}
.menu {
  width: 50%;
}
.login {
  width: 20%;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  background: #333;
  padding: 10px;
  color: white;
}
nav a {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
}
nav a:hover {
  background: #555;
  border-radius: 5px;
}
.dropdown {
  position: relative;
}
.dropdown:hover .submenu {
  display: block;
}
.submenu {
  display: none;
  padding: 0;
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-width: 100px;
  background-color: #fff;
}
.submenu li {
  padding: 10px;
  white-space: nowrap;
}
.submenu li a {
  color: black;
}
.submenu li a:hover {
  background: #f0f0f0;
}
</style>
