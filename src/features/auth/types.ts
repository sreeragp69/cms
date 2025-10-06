
export type { LoginInput, SocialProvider } from "./schemas"

export interface AuthResponse {
  userId: string
  token: string
}

export interface AuthError {
  code: string
  message: string
}
