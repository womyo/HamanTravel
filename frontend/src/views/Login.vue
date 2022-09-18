<template>
  <Form @submit="handleLogin" :validation-schema="schema">
    <div class="form-group">
      <label for="username">아이디</label>
      <Field name="username" type="text" class="form-control" />
      <ErrorMessage name="username" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="password">비밀번호</label>
      <Field name="password" type="password" class="form-control" />
      <ErrorMessage name="password" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary btn-block" :disabled="loading">
        <span
          v-show="loading"
          class="spinner-border spinner-border-sm"
        ></span>
        <span>로그인</span>
      </button>
    </div>
    <div class="form-group">
      <div v-if="message" class="alert alert-danger" role="alert">
        {{ message }}
      </div>
    </div>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("아이디를 입력해 주세요"),
      password: yup.string().required("비밀번호를 입력해 주세요"),
    });
    return {
      loading: false,
      message: "",
      schema,
      prevRoute: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.go(-1);
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push(this.prevRoute.path);
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style>
.error-feedback{
  color: #9F3A38;
}
.form-group{
  background-color: rgba(255, 255, 255, 0.3);
}
</style>