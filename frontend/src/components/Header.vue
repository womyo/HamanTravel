<template>
    <div id="header">
        <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
            <div class="container container-fluid">
                <a class="navbar-brand" href="/">
                    <img id="logo" src="../assets/logo.png" alt="">
                </a>
                <div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse" id="navContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" href="/">홈</a>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link active" to="/keyword">키워드 관광</router-link>
                        </li>
                        <li class="nav-item float-end ms-md-auto">
                            <router-link class="nav-link active" to="/course">코스 추천</router-link>
                        </li>
                        <li class="nav-item float-end ms-md-auto">
                            <router-link class="nav-link active" to="/community/list">함 말해봐</router-link>
                        </li>
                        <div v-if="!currentUser" class="navbar-nav ml-auto">
                            <li class="nav-item float-end ms-md-auto">
                                <router-link class="nav-link active" to="/register">가입</router-link>
                            </li>
                            <li class="nav-item float-end ms-md-auto">
                                <router-link class="nav-link active" to="/login">로그인</router-link>
                            </li>
                        </div>
                        <div v-if="currentUser" class="navbar-nav ml-auto">
                            <li class="nav-item float-end ms-md-auto">
                                <router-link class="nav-link active" to="/profile">{{ currentUser.username }}</router-link>
                            </li>
                            <li class="nav-item float-end ms-md-auto">
                                <a class="nav-link active" @click.prevent="logOut">로그아웃</a>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>

export default {
  name: "Header",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
#header {
    z-index: 1;
    position: relative;
}
#logo {
    width: 100px;
    height: 40px;
}
</style>