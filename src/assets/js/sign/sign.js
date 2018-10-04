Vue.use(VeeValidate);

new Vue({
  el: '#signForm',
  data: {
    id: '',
    pwd: '',
  },
  mounted() {
    baseUri = window.location.origin;
  },
  methods: {
    snsButton: function (event, sns) {
      event.preventDefault();

      this.$validator.validateAll()
        .then(cb => {
          // cb callback type : boolean
          if (cb) {
            let apiPath = `${baseUri}/api/sign`
            axios.post(apiPath, {
              userId: this.id,
              userPwd: this.pwd,
              snsAouth: this.sns
            })
            .then((cb) => {
              console.log(cb);
            })
            .catch((err) => {
              console.log(err);
            });
          }
        });
    }
  }
})
