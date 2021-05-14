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

export interface ActualUser {
  _id: string,
  name: string,
  email: string,
  friends: string[]
}
