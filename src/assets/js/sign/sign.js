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
    snsButton: function (event, usersns) {
      event.preventDefault();

      this.$validator.validateAll()
        .then(cb => {
           if (cb) {
            let apiPath = `${baseUri}/api/sign`
            axios.post(apiPath, {
              userid: this.userid,
              userpwd: this.userpwd,
              snsAouth: this.usersns
            })
            .then((cb) => {
              if (cb.data.userid) {
                alert('정상 로그인 되었습니다.');
                window.location.replace('../');
              }
            })
            .catch((err) => {
              console.log(err);
            });
          }
        });
    }
  }
})
