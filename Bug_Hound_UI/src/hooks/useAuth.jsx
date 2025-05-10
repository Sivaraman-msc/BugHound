import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function UseAuth() {
  return useContext(AuthContext)
}
