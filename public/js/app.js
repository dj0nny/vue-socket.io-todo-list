Vue.component('app-header', {
  template: `
    <div class="header">
      <div class="container full">
        <div class="row">
          <div class="twelve columns">
            <h1>Vue - Socket.io</h1>
          </div>
        </div>
      </div>
    </div>
  `
});

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue',
  }
});
