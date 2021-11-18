import axios from 'axios'
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import { Message, MessagesState } from '../../utils/types'

const initialState: MessagesState = {
  messages: [],
  loading: false,
  error: null,
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }: PayloadAction<Message[]>) => {
      state.messages = payload
    },
    addMessage: (state, { payload }: PayloadAction<Message>) => {
      state.messages.push(payload)
    },
    setLoading: (state) => {
      state.loading = true
    },
    setLoadingComplete: (state) => {
      state.loading = false
    },
  },
})

export const {
  addMessage,
  setMessages,
  setLoading,
  setLoadingComplete,
} = messagesSlice.actions
export default messagesSlice.reducer

// Action
export function getMessages() {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading())

    try {
      const { data } = await axios('/api/messages')
      dispatch(setMessages(data.messages))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setLoadingComplete())
    }
  }
}
