import { Kid } from './kid'
export class User {
  id?: number
  role?: string
  name?: string
  email: string
  avatar_url?: string
  first_name: string
  last_name?: string
  phone_number?: string
  avatar?: string
  access_token?: string

  public full_name(): string {
    if(!!name) {
      return this.name;
    } else {
      return this.first_name + ' ' + this.last_name || ' '
    }
  }

}