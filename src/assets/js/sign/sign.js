Vue.use(VeeValidate);

new Vue({
  el: '#signForm',
  data: {
    id: '',
    pwd: '',
  },
  methods: {
    snsButton: function (event, sns) {
      event.preventDefault();
      this.$validator.validateAll()
      .then(cb => {
        // cb callback type : boolean
        if (cb) {
          console.log(' run axios ');
        }
      });
      console.log(sns);
    }
  }
})
