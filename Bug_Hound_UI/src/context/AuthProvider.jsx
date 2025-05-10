import React, { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import { GetUserByIdAPI } from '../services/AuthService'
import { AuthContext } from './AuthContext'

export default function AuthProvider({children}) {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    const login =async(userData)=>{
      setUser(userData)
    }

    const logout=()=>{
      setUser(null)
    }
    useEffect(() => {
      const fetchData = async () => {
        try {
          const StoredUser = cookie.get('user')
          if (StoredUser) {
            const userId = JSON.parse(StoredUser)?._id
            const res = await GetUserByIdAPI(userId)
            setUser(res.data)
          }
        } catch (err) {
          console.log(`Auth error : ${err}`)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }, [])

    useEffect(()=>{
      if(user){
        cookie.set('user', JSON.stringify(user), { expires: 30 })
      } else{
        cookie.remove('user')
      }
    },[user])
  return (
    <AuthContext.Provider value={{user,loading,login,logout}}>
      {children}
    </AuthContext.Provider>
  )
}
