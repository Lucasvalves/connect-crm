import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { AuthRepository } from '../repositories/AuthRepository'

let scretKey: string | undefined = process.env.ACCESS_KEY_TOKEN

export class AuthService {
  private authRepository: AuthRepository

  constructor() {
    this.authRepository = new AuthRepository()
  }

  async register(email: string, password: string) {
    const existing = await this.authRepository.findUserByEmail(email)
    if (existing) throw new Error('Email already in use')

    const hashed = await bcrypt.hash(password, 10)

    const user = await this.authRepository.create(email, hashed)

    if (!scretKey) {
      throw new Error('There is no token key')
    }
    const token = sign({ userId: user.id }, scretKey, {
      expiresIn: '7d'
    })
    return {
      token,
      user: {
        id: user.id,
        email: user.email
      }
    }
  }

  async login(email: string, password: string) {
    const user = await this.authRepository.findUserByEmail(email)
    if (!user) throw new Error('Invalid credentials')

    const match = await bcrypt.compare(password, user.senha)
    if (!match) throw new Error('Invalid credentials')

    if (!scretKey) {
      throw new Error('There is no token key')
    }
    const token = sign({ userId: user.id }, scretKey, {
      expiresIn: '7d'
    })
    return {
      token,
      user: {
        id: user.id,
        email: user.email
      }
    }
  }
}
