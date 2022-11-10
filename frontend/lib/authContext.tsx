import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { createContext, PropsWithChildren } from 'react'
import { getUserFromLocalCookie } from '../lib/auth'

export interface AuthI {
  user: null | string
  loading: boolean
}

export interface AuthPropsI extends PropsWithChildren {
  value: AuthI
}

const auth: AuthI = {
  user: null,
  loading: false,
}
let userState: AuthI['user'] = null

export const AuthContext = createContext<AuthI>(auth)

export const AuthContextProvider = ({ value, children }: AuthPropsI) => {
  const { user } = value
  console.log(value)
  useEffect(() => {
    if (!userState && user) {
      userState = user
    }
  })

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export const useFetchUser = () => {
  const [data, setUser] = useState({
    user: userState,
    loading: false,
  })

  useEffect(() => {
    if (userState !== null) {
      return
    }

    let isMounted = true
    const resolveUser = async () => {
      const user = await getUserFromLocalCookie()
      if (isMounted) {
        setUser({ user, loading: false })
      }
    }
    resolveUser()

    return () => {
      isMounted = false
    }
  }, [])

  return data
}
