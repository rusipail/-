import {writable} from 'svelte/store'
import io from 'socket.io-client'

export const socket = io('/socket.io/chat-community', {
  transports: ['websocket']
})