import { server } from 'config'
import Cookies from 'js-cookie'
import Router from 'next/router'
import { AuthResponseI } from 'src/models'
import axios from 'axios'
import { GetServerSideProps, GetStaticProps } from 'next'
import { IncomingMessage } from 'http'

export const setToken = (data: AuthResponseI) => {
  if (typeof window === 'undefined') {
    return
  }
  if (data.user === null) return
  Cookies.set('id', data.user.id)
  Cookies.set('username', data.user.username)
  Cookies.set('jwt', data.jwt)

  if (Cookies.get('username')) {
    Router.reload()
  }
}

export const unsetToken = () => {
  if (typeof window === 'undefined') {
    return
  }
  Cookies.remove('id')
  Cookies.remove('jwt')
  Cookies.remove('username')
  Router.reload()
}

export const getUserFromLocalCookie = () => {
  const jwt = getTokenFromLocalCookie()
  if (jwt) {
    return axios
      .get(`${server}/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => response.data.username)
      .catch((error) => console.error('algo salio mal', error))
  } else {
    return
  }
}

export const getIdFromLocalCookie = () => {
  const jwt = getTokenFromLocalCookie()
  if (jwt) {
    return axios
      .get(`${server}/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => response.data.id)
      .catch((error) => console.error('algo salio mal', error))
  } else {
    return
  }
}

export const getTokenFromLocalCookie = () => {
  return Cookies.get('jwt')
}

export const getTokenFromServerCookie = (req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> }) => {
  if (!req.headers.cookie || '') {
    return undefined
  }
  const jwtCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith('jwt='))
  if (!jwtCookie) {
    return undefined
  }
  const jwt = jwtCookie.split('=')[1]
  return jwt
}

export const getIdFromServerCookie = (req: { headers: { cookie: string } }) => {
  if (!req.headers.cookie || '') {
    return undefined
  }
  const idCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith('id='))
  if (!idCookie) {
    return undefined
  }
  const id = idCookie.split('=')[1]
  return id
}
