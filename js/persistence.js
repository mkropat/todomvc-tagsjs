const STORAGE_KEY = 'todos-tagsjs'

export const loadTodos = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

export const saveTodos = (todos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}
