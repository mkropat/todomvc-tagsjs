window.process = { env: {} } // Shim for immer.esm.js
import { produce } from '../lib/immer.esm.js'
import { store } from '../lib/store.js'
store.enableMutate(produce)
