/**
 * This plugin enables persistant storage to the state.
 */

import { omit } from 'lodash'
import VuexPersistence from 'vuex-persist'

// Add mutations here to blacklist saving to store
const mutationsBlacklist = [
  'unlock',
  'setAccountError',
  'setPhrase',
  'files',
  'toggleIncomingCall',
  'setMessages',
  'sendMessage',
]

// State properties path to blacklist saving to store
const propertiesBlacklist = [
  'accounts.pin',
  'accounts.mnemonic',
  'accounts.locked',
  'accounts.error',
  'accounts.loading',
]

export default ({ store }: { store: any }) => {
  new VuexPersistence({
    key: 'Satellite-Store',
    reducer: (state: any) => {
      // Lodash omit is not so performant, but it's actually fine
      // for blacklisting the state to be persisted
      return omit(state, propertiesBlacklist)
    },
    filter: (mutation) => {
      // Allows blacklisting of data we don't want stored
      return !mutationsBlacklist.includes(mutation.type)
    },
  }).plugin(store)
}
