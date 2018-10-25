Vue.use(VeeValidate);

new Vue({
  el: '#regForm',
  data: {
    userEmail: '',
    userPwd: '',
    userName: ''
  },
  mounted() {
    baseUri = window.location.origin;
  },
  methods: {
    localRegister: function () {
      event.preventDefault();

      this.$validator.validateAll()
        .then((cb) => {
          if (cb) {
            let apiPath = `${baseUri}/api/sign/signin`;
            axios.post(apiPath, {
              userName: this.userName,
              userEmail: this.userEmail,
              userPwd: this.userPwd
            })
            .then((cb) => {
              if (cb.data.status) {
                alert('정상 로그인 되었습니다.');
                window.location.replace('../');
              }
            })
            .catch((err) => {
              if (err.response.status === 401) {
                alert('로그인 실패 하였습니다.\n다시 시도하세요');
                window.location.replace('./signin');
              }
            });
          }
        })
    },
  }
});
