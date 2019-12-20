Vue.config.devtools = true;

const socket = io.connect('http://localhost:5050');

Vue.component('app-header', {
  template: `
    <div class="header">
      <div class="container">
        <div class="row">
          <div class="twelve columns">
            <h1>Vue - Socket.io</h1>
          </div>
        </div>
      </div>
    </div>
  `
});

Vue.component('add-todo', {
  template: `
    <div class="container">
      <div class="row">
        <div class="ten columns">
          <input class="u-full-width" v-model="todo" type="text" placeholder="Todo" />
        </div>
        <div class="two columns">
          <button @click="addTodo" class="u-full-width">Add todo</button>
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
        <div class="twelve columns" v-if="list.length === 0">
            No todo added yet
        </div>
        <div class="todo-items" v-else>
          <div class="four columns todo-item" v-bind:class="{ complete: item.done }" v-for="(item, index) in list" :key="index" @click="markTodo(item)">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    markTodo(todo) {
      if (todo.done) {
        this.$emit('marked-todo', todo);
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

Vue.component('notifications', {
  props: {
    list: Array
  },
  template: `
    <div class="notifications">
      <div class="notification-item" v-for="(item, index) in list" :key="index">
        {{ item }}
      </div>
    </div>
  `
});

const app = new Vue({
  el: '#app',
  data: () => ({
    todoItems: [],
    notifications: [],
  }),
  created() {
    socket.on('todo', (data) => { 
      this.todoItems.push(data.todo);
      this.notifications.push(data.notification)
    }),
    socket.on('marked', (data) => {
      this.notifications.push(data.notification);
      this.todoItems.map(element => {
        if (element.name === data.todo.name) {
          element.done = !element.done;
        }
      });
    })
  },
});
