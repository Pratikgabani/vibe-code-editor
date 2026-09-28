export interface User{
  id: string
  name: string | null
  email: string | null
  image: string | null
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface Project{
    id: string
    title: string
    description?: string | null
    template : string
    userId: string
    createdAt: Date
    updatedAt: Date
    user : User
    StarMark?: {isMarked : boolean}[]
}