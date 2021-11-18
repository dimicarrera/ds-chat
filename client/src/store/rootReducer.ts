import { combineReducers, Reducer } from 'redux'

import authReducer from './slices/auth.slice'
import usersReducer from './slices/users.slice'
import messagesReducer from './slices/messages.slice'

import { RootState } from '../utils/types'

export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  authState: authReducer,
  usersState: usersReducer,
  messagesState: messagesReducer,
})
