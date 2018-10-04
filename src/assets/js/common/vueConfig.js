Vue.options.delimiters = ['{$', '$}'];

const veeConf = {
  locale: 'ko',
}

// axios가 링크 될때만 작동
try {
  axios.defaults.headers.common['X-CSRFToken'] = "{% csrf_token %}"
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
} catch (error) {}
