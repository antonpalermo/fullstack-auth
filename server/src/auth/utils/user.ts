export type User = {
  id: string
  email: string
  username: string
  password: string
}

export const sampleUsers: User[] = [
  {
    id: '101',
    email: 'JDoe@personal.com',
    username: 'JDoe',
    password: 'password'
  },
  {
    id: '102',
    email: 'MBuster@personal.com',
    username: 'MBuster',
    password: 'password'
  },
  {
    id: '103',
    email: 'ABarbara@personal.com',
    username: 'ABarbara',
    password: 'password'
  }
]
