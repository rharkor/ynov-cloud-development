export type TTokenPayload = {
  user: {
    id: string
    email: string
    name: string
  }
  exp: number
  sid: string
}
