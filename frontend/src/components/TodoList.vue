<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">
    <div v-for="(todo,index) in todos" :key="todo.id" class="todo-item">
      <div class="todo-item-left">
        <input type="checkbox" v-model="todo.status">
        <div v-if="!todo.editing" @dblclick="editTodo(todo)" class="todo-item-label"
             :class="{ completed : todo.status }">{{ todo.description }}
        </div>
        <input v-else class="todo-item-edit" type="text" v-model="todo.description" @blur="doneEdit(todo)"
               @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" v-focus>
      </div>
      <div class="remove-item" @click="removeTodo(index)">
        &times;
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'todo-list',
    data() {
      return {
        newTodo: '',
        beforeEditCache: '',
        todos: []
      }
    },
    created() {
      axios
        .get('http://localhost:8090/backend-1.4-SNAPSHOT/api/todos/all')
        .then(response => (this.todos = response.data), error => {
          console.error(error);
        });
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    methods: {
      addTodo() {
        if (this.newTodo.trim().length === 0) {
          return
        }

        this.todos.push({
          description: this.newTodo,
          dueDate: '',
          id: '',
          name: '',
          status: false,
          editing: false
        })

        this.newTodo = ''
      },
      removeTodo(index) {
        this.todos.splice(index, 1)
        axios
          .delete('http://localhost:8090/backend-1.4-SNAPSHOT/api/todos/' + index)
          .then(response => (console.log(response.status)), error => {
            console.error(error);
          });
      },
      editTodo(todo) {
        this.beforeEditCache = todo.description
        todo.editing = true
      },
      cancelEdit(todo) {
        todo.editing = false
        todo.name = this.beforeEditCache
      },
      doneEdit(todo) {
        if (todo.description.trim().length === 0) {
          todo.name = this.beforeEditCache
        }
        todo.editing = false
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus {
      outline: 0;
    }
  }

  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
  }

  .remove-item {
    cursor: pointer;
    margin-left: 14px;

    &:hover {
      color: black;
    }
  }


  .todo-item-left { // later
    display: flex;
    align-items: center;
  }

  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }

  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc; //override defaults
    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    &:focus {
      outline: none;
    }
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }
</style>

