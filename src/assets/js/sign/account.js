Vue.use(VeeValidate);

new Vue({
  el: '#signForm',
  data: {
    userid: '',
    userpwd: '',
  },
  mounted() {
    baseUri = window.location.origin;
  },
  methods: {
  
    // oauthLogin: function (event, usersns) {
    //   console.log(`${usersns}`);
    // },
    localLogin: function (event) {
      event.preventDefault();

      this.$validator.validateAll()
        .then(cb => {
          if (cb) {
            let apiPath = `${baseUri}/api/sign/account`
            axios.post(apiPath, {
                userid: this.userid,
                userpwd: this.userpwd
              })
              .then((cb) => {
                if (cb.data.userid) {
                  alert('정상 로그인 되었습니다.');
                  window.location.replace('../');
                }
              })
              .catch((err) => {
                if (err.response.status === 401) {
                  alert('로그인 실패 하였습니다.\n다시 시도하세요');
                  window.location.replace('./account');
                }
              });
          }
        });
    }
  }
})
