import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import _ from 'lodash'

export const Chat: React.FC = () => {
  const dispatch = useDispatch()
  const [messageInput, setMessageInput] = useState('')

  return (
    <>
      <div onClick={() => {}} />
      <div>
        <div>Sidebar will be here</div>
        <div>Chat will be here</div>
      </div>
    </>
  )
}
