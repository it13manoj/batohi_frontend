import { jwtDecode } from 'jwt-decode'

export interface JwtPayload {
  id: number
  email: string
  type: string
  status: boolean
  iat: number
  exp: number
}

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token)
  } catch (error) {
    console.error('Invalid JWT:', error)
    return null
  }
}
