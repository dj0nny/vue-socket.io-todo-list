Vue.config.devtools = true;

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
        this.$emit('todo-added', this.todo);
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
        <div class="twelve columns">
          <div class="empty" v-if="list.length === 0">
            No todo added yet
          </div>
          <ul v-else>
            <li v-for="(todo, index) in list" :key="index">
              {{ todo }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  `
});

const app = new Vue({
  el: '#app',
  data: () => ({
    todoItems: [],
  }),
  methods: {
    updateTodoList(newTodo) {
      this.todoItems.push(newTodo);
    }
  }
});
