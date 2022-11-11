export interface AuthResponseI {
  jwt: string
  user: UserI
}

export interface UserI {
  id: string
  avatar: string
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: Date
  updatedAt: Date
}
export interface AuthResponseErrorI {
  data: null
  error: Error
}

export interface Error {
  status: number
  name: string
  message: string
  details: Details
}

export interface Details {}
