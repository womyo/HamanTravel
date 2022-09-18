<template>
  <Form @submit="handleRegister" :validation-schema="schema">
    <div v-if="!successful">
      <div class="form-group">
        <label for="email">이메일</label>
        <Field name="email" type="email" class="form-control" />
        <ErrorMessage name="email" class="error-feedback" />
      </div>
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
          회원가입
        </button>
      </div>
    </div>
  </Form>
  <div
    v-if="message"
    class="alert"
    :class="successful ? 'alert-success' : 'alert-danger'"
  >
    {{ message }}
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("아이디를 입력해 주세요")
        .max(20, "입력 가능 길이를 초과하였습니다"),
      email: yup
        .string()
        .required("이메일을 입력해 주세요")
        .email("이메일이 유효하지 않습니다")
        .max(50, "입력 가능 길이를 초과하였습니다"),
      password: yup
        .string()
        .required("비밀번호를 입력해 주세요")
        .min(6, "비밀번호는 6글자 이상이어야 합니다")
        .max(40, "입력 가능 길이를 초과하였습니다"),
    });
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
      this.$router.push("/login");
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