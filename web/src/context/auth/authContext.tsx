import { createContext, PropsWithChildren, useEffect, useState } from 'react'

import { api } from 'lib/axios'
import { useRouter } from 'next/router'

interface Data {
  email: string
  token: string
}

type ContextType = {
  data: Data | null
  sigin: (email: string, token: string) => void
}

export const AuthContext = createContext<ContextType | null>(null)

export const AuthProvaider = (props: PropsWithChildren) => {
  const router = useRouter()
  const [data, setData] = useState<Data | null>(null)

  useEffect(() => {
    const validate = async () => {
      const storageToken = localStorage.getItem('token')

      if (storageToken) {
        const validateToken = await api.post('/validatetoken', { storageToken })
        setData(validateToken)
      }
    }
    validate()
  }, [])

  const sigin = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/login', { email, password })

      localStorage.setItem('token', data.token)
      setData(data)
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ data, sigin }}>{props.children}</AuthContext.Provider>
  )
}
