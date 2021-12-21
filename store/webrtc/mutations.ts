import { WebRTCState } from './types'

const mutations = {
  setInitialized(state: WebRTCState, initialized: boolean) {
    state.initialized = initialized
  },
  setIncomingCall(state: WebRTCState, id: string) {
    state.incomingCall = id
  },
  setActiveCall(state: WebRTCState, id: string) {
    state.activeCall = id
  },
  updateLocalTracks(
    state: WebRTCState,
    tracks: {
      audio?: {
        id: string
        muted: boolean
      }
      video?: {
        id: string
        muted: boolean
      }
    },
  ) {
    state.localTracks = { ...state.localTracks, ...tracks }
  },
  updateRemoteTracks(
    state: WebRTCState,
    tracks: {
      audio?: {
        id: string
        muted: boolean
      }
      video?: {
        id: string
        muted: boolean
      }
    },
  ) {
    state.remoteTracks = { ...state.localTracks, ...tracks }
  },
}

export default mutations
