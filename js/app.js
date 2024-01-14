import './setup-mutate.js'

import { store } from '../lib/store.js'
import {
  a,
  button,
  div,
  form,
  input,
  label,
  li,
  strong,
} from '../lib/tags.js'
import {
  loadTodos,
  saveTodos,
} from './persistence.js'
import {
  addTodo,
  clearCompleted,
  destroyTodo,
  newTodo,
  toggleTodo,
  updateCompleted,
  updateTitle,
} from './models/todo.js'

const ESCAPE_KEY = 27

const appSection = document.querySelector('.todoapp')
const mainSection = appSection.querySelector('main')
const todoListing = mainSection.querySelector('.todo-list')
const toggleAllCheckbox = mainSection.querySelector('.toggle-all')
const footerSection = appSection.querySelector('footer')
const todoCounter = footerSection.querySelector('.todo-count')
const filtersList = footerSection.querySelector('.filters')
const clearCompletedButton = footerSection.querySelector('.clear-completed')

const init = () => {
  let { filter=null, unrecognizedRoute=false } = parseRoute()
  store.update({
    editingSelection: null,
    filter,
    todos: loadTodos() || [],
  })
  if (unrecognizedRoute) {
    location.hash = '#/'
  }
}

addEventListener('hashchange', () => {
  let { filter, unrecognizedRoute } = parseRoute()
  if (unrecognizedRoute) {
    location.hash = '#/'
    return
  }
  store.update({ filter })
})

store.subscribe(({ todos }) => saveTodos(todos))

newTodoForm.onsubmit = (evt) => {
  evt.preventDefault()

  let newTodoField = newTodoForm.elements['newTodoField']
  let title = newTodoField.value.trim()
  if (!title) { return }

  addTodo(newTodo(title))
  newTodoField.value = ''
}

const renderMainControls = ({ todos }) => {
  mainSection.style.display = todos.length ? '' : 'none'

  toggleAllCheckbox.checked = todos.every(todo => todo.completed)
  toggleAllCheckbox.onchange = () => {
    for (let todo of todos) {
      updateCompleted(todo.id, toggleAllCheckbox.checked)
    }
  }
}

store.subscribe(renderMainControls)

const renderTodos = ({ editingSelection, filter, todos }) => {
  todoListing.replaceChildren(
    ...getVisibleTodos({ filter, todos }).map(todo => {
      let { completed, id, title } = todo

      let startEditMode = async () => {
        await store.update({
          editingSelection: id,
        })
        focusLiEditField()
      }

      let editField = input({
        class: 'edit',
        value: title,
        onblur: () => saveEdit(),
        onkeydown: evt => {
          if (evt.which === ESCAPE_KEY) {
            exitEditMode()
          }
        },
      })

      let saveEdit = () => {
        if (editField.value) {
          updateTitle(id, editField.value.trim())
        } else {
          destroyTodo(id)
        }
        exitEditMode()
      }

      let exitEditMode = () => {
        store.update({
          editingSelection: null,
        })
      }

      return li({ class: getLiClass({ editingSelection, todo }) },
        div({ class: 'view' },
          input({
            checked: completed,
            class: 'toggle',
            type: 'checkbox',
            onclick: () => {
              toggleTodo(id)
            },
          }),
          label({ ondblclick: startEditMode },
            title
          ),
          button({
            class: 'destroy',
            onclick: () => {
              destroyTodo(id)
            }
          })
        ),
        form(
          {
            onsubmit: evt => {
              evt.preventDefault()
              saveEdit()
            },
          },
          editField,
        ),
      )
    })
  )
}

store.subscribe(renderTodos)

const getVisibleTodos = ({ filter, todos }) => {
  if (filter === 'active') {
    return todos.filter(todo => !todo.completed)
  }
  if (filter === 'completed') {
    return todos.filter(todo => todo.completed)
  }
  return todos
}

const getLiClass = ({ editingSelection, todo }) => {
  let result = []
  if (todo.completed) {
    result.push('completed')
  }
  if (editingSelection === todo.id) {
    result.push('editing')
  }
  return result
}

const focusLiEditField = () => {
  let editField = todoListing.querySelector('li.editing input.edit')
  editField.focus()
  editField.selectionStart = editField.selectionEnd = editField.value.length
}

const renderFooter = ({ filter, todos }) => {
  footerSection.style.display =
    todos.length > 0
      ? ''
      : 'none'

  let completedTodos = todos.filter(todo => todo.completed)
  let uncompletedTodos = todos.filter(todo => !todo.completed)

  todoCounter.replaceChildren(
    strong(uncompletedTodos.length),
    uncompletedTodos.length === 1
      ? ' item left'
      : ' items left'
  )

  filtersList.replaceChildren(
    li(a(
      {
        class: filter === null ? 'selected' : '',
        href: '#/'
      },
      'All'
    )),
    li(a(
      {
        class: filter === 'active' ? 'selected' : '',
        href: '#/active',
      },
      'Active'
    )),
    li(a(
      {
        class: filter === 'completed' ? 'selected' : '',
        href: '#/completed',
      },
      'Completed'
    )),
  )

  clearCompletedButton.style.display = completedTodos.length ? '' : 'none'
  clearCompletedButton.onclick = clearCompleted
}

store.subscribe(renderFooter)

const parseRoute = () => {
  let route = location.hash.substring(1)
  if (route === "/") {
    return { filter: null }
  }
  if (route === "/active") {
    return { filter: 'active' }
  }
  if (route === "/completed") {
    return { filter: 'completed' }
  }
  return { unrecognizedRoute: true }
}

init()
