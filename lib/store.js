// store.js [v2024-01-01]

let lastState = {}, nextState = {}
let listeners = []
let timer
let updateCallbacks = []

export const store = window.$store = {
  subscribe(handler) {
    listeners.push(handler)
    return () => {
      listeners = listeners.filter(l => l !== handler)
    }
  },

  update(updaterOrNewState) {
    let updater = typeof updaterOrNewState === 'function'
      ? updaterOrNewState
      : () => updaterOrNewState
    nextState = {
      ...nextState,
      ...updater(nextState),
    }

    let result = new Promise(res => {
      updateCallbacks.push(res)
    })

    clearTimeout(timer)
    timer = setTimeout(notifyStoreSubscribers)

    return result
  },

  enableMutate(produce) {
    store.mutate = function mutate (recipe) {
      store.update(
        state => produce(state, (draftState) => void recipe(draftState))
      )
    }
  },
}

const notifyStoreSubscribers = () => {
  let errors = []

  let state = nextState

  let callbacks = [...updateCallbacks]
  updateCallbacks = []

  for (let l of [...listeners, ...callbacks]) {
    try {
      l(state, lastState)
    } catch (ex) {
      errors.push(ex)
    }
  }

  lastState = state

  if (errors.length === 1) {
    throw errors[0]
  }
  else if (errors.length) {
    throw new AggregateError('Multiple store subscribers failed to run', errors)
  }
}

class AggregateError extends Error {
  constructor(message, errors) {
    super(`${message}:\n\n${errors.map(e => e.message).join('\n')}`)
    this.errors = errors
  }
}
