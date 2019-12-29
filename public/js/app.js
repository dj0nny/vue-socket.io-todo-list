Vue.config.devtools = true;

const socket = io.connect('http://localhost:5050');

Vue.component('app-header', {
  template: `
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo center">Vue - Socket.io</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="https://github.com/dj0nny/vue-socket.io" target="_blank">Github</a></li>
        </ul>
      </div>
    </nav>
  `
});

Vue.component('add-todo', {
  template: `
    <div class="container">
      <div class="row">
        <div class="input-field col m12">
          <input placeholder="Todo..." v-model="todo" type="text" class="validate">
          <label for="first_name">Todo name</label>
        </div>
        <div class="col m12">
          <a @click="addTodo" class="waves-effect waves-light btn">button</a>
        </div>
      </div>
    </div>
  `,
  data: () =>({
    todo: '',
  }),
  methods: {
    addTodo() {
      if (this.todo === '') {
        alert('The field is empty');
      } else {
        socket.emit('todo', {
          todo: {
            name: this.todo,
            done: false,
          },
          notification: 'A new todo was added',
        });
      }
    }
  }
});

Vue.component('todo-list', {
  props: {
    list: Array,
  },
  template: `
    <div class="container">
      <div class="row">
        <div class="col m12" v-if="list.length === 0">
            No todo added yet
        </div>
        <div class="todo-items" v-else>
          <div class="col s12 m4 todo-item" v-bind:class="{ complete: item.done }" v-for="(item, index) in list" :key="index">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">{{ item.name }}</span>
              </div>
              <div class="card-action">
                <a href="#" @click="markTodo(item)">Mark as done</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    markTodo(todo) {
      if (todo.done) {
        // this.$emit('marked-todo', todo);
        socket.emit('marked', {
          todo,
          notification: `${todo.name} was marked as not done`,
        });
      } else {
        this.$emit('marked-todo', todo);
        socket.emit('marked', {
          todo,
          notification: `${todo.name} was marked as done`,
        });
      }
    }
  }
});

const app = new Vue({
  el: '#app',
  data: () => ({
    todoItems: [],
  }),
  created() {
    socket.on('todo', (data) => { 
      this.todoItems.push(data.todo);
      M.toast({ html: data.notification })
    }),
    socket.on('marked', (data) => {
      M.toast({ html: data.notification })
      this.todoItems.map(element => {
        if (element.name === data.todo.name) {
          element.done = !element.done;
        }
      });
    })
  },
});
