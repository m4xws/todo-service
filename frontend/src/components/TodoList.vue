<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">
    <div v-for="(todo,index) in todos" :key="todo.id" class="todo-item">
      <div class="todo-item-left">
        <input type="checkbox" v-model="todo.status">
        <div v-if="!todo.editing" @dblclick="editTodo(todo)" class="todo-item-label" :class="{ completed : todo.status }">{{ todo.name }}</div>
        <input v-else class="todo-item-edit" type="text" v-model="todo.name" @blur="doneEdit(todo)"
               @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" v-focus>
      </div>
      <div class="remove-item" @click="removeTodo(index)">
        &times;
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'todo-list',
    data() {
      return {
        newTodo: '',
        idForTodo: 3,
        beforeEditCache: '',
        todos: [{
          "description": "todo",
          "dueDate": "2020-01-10T07:30",
          "id": 1,
          "name": "Clean kitchen",
          "status": true,
          "editing": false
        }, {
          "description": "todo",
          "dueDate": "2020-02-10T07:30",
          "id": 2,
          "name": "Buy toilet paper",
          "status": true,
          "editing": false
        }, {
          "description": "todo",
          "dueDate": "2020-03-10T07:30",
          "id": 3,
          "name": "Become a prepper",
          "status": false,
          "editing": false
        }]
      }
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
          description: '',
          dueDate: '',
          id: this.idForTodo,
          name: this.newTodo,
          status: false,
          editing: false
        })

        this.newTodo = ''
        this.idForTodo++
      },
      removeTodo(index) {
        this.todos.splice(index, 1)
      },
      editTodo(todo) {
        this.beforeEditCache = todo.name
        todo.editing = true
      },
      cancelEdit(todo) {
        todo.editing = false
        todo.name = this.beforeEditCache
      },
      doneEdit(todo) {
        if (todo.name.trim().length === 0) {
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

