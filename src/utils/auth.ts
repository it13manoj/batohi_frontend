import { jwtDecode } from 'jwt-decode'

export interface JwtPayload {
  id: number
  email: string
  type: string
  status: boolean
  iat: number
  exp: number
}

export {
  decodeToken,
  getToken,
  isTokenValid,
  getUserRole,
  getDashboardRoute,
  saveAuthSession,
  clearAuthSession
} from './auth.js'
