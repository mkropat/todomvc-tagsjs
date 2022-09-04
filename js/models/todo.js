import { store } from '../../lib/store.js'

export const newTodo = (title) => ({
  completed: false,
  id: crypto.randomUUID(),
  title,
})

export const addTodo = (todo) => {
  store.update(({ todos }) => ({
    todos: [
      ...todos,
      todo,
    ]
  }))
}

export const toggleTodo = (id) => {
  store.mutate(({ todos: draftTodos }) => {
    let todo = draftTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
  })
}

export const updateCompleted = (id, completed) => {
  store.mutate(({ todos: draftTodos }) => {
    let todo = draftTodos.find(todo => todo.id === id)
    todo.completed = completed
  })
}

export const updateTitle = (id, title) => {
  store.mutate(({ todos: draftTodos }) => {
    let todo = draftTodos.find(todo => todo.id === id)
    todo.title = title
  })
}

export const destroyTodo = (id) => {
  store.update(({ todos }) => ({
    todos: todos.filter(todo => todo.id !== id),
  }))
}

export const clearCompleted = () => {
  store.update(({ todos }) => ({
    todos: todos.filter(todo => !todo.completed),
  }))
}
