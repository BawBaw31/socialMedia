export interface NewUser {
  name: string,
  email: string,
  password: string,
  verifPassword: string
}

export interface LogUser {
  email: string,
  password: string
}
