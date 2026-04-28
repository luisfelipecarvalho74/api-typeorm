import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import type { NextFunction, Request, Response } from "express"
import { BadRequestError, NotFoundError } from "../helpers/apiError"
import { validate } from "class-validator"
import { formatErrors } from "../helpers/formatErrors"

export  class UserController {
    private userRepository = AppDataSource.getRepository(User)

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {firstName, lastName, email} = req.body
            const newUser = this.userRepository.create({firstName, lastName, email}) 
            const errors = await validate(newUser)
            if (errors.length > 0) {
              const formattedErrors = formatErrors(errors)
              throw new BadRequestError("Falha na validação!", formattedErrors)
            }
            await this.userRepository.save(newUser)
            return res.status(201).json(newUser)
        } catch(error: unknown) {
            next (error)
        }
    }

    async update (req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number (req.params.id)
            const { firstName, lastName, email }  = req.body
            if(isNaN(id)) {
                throw new BadRequestError("ID inválido")
            }
            const user = await this.userRepository.findOneBy({ id })
            if (!user) {
                throw new NotFoundError("Usuário não encontrado.")
            }
            if (email && email !== user.email) {
              const existingUser = await this.userRepository.findOneBy({ email })
              if (existingUser) {
                throw new BadRequestError("E-mail fornecido já está em uso")
              }
            }
            user.firstName = firstName ?? user.firstName
            user.lastName = lastName ?? user.lastName
            user.email = email ?? user.email
            const errors = await validate(user)
            if (errors.length > 0) {
              const formattedErrors = formatErrors(errors)
              throw new BadRequestError("Falha  na validação", formattedErrors)
            }
            await this.userRepository.save(user)
            return res.json(user)
          } catch (error: unknown) {
            next (error)
          }
    }

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userRepository.find()
            return res.json(users)
          } catch(error: unknown) {
            next (error)
        }
    }

    listActive = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const users = await this.userRepository.findBy({ isActive: true });
          return res.json(users)
          } catch (error: unknown) {
          next(error)
        }
      }

      listById = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const id = Number(req.params.id)
          if (isNaN(id)) {
            throw new BadRequestError("ID inválido")
          }
          const user = await this.userRepository.findOneBy({ id })
          if (!user) {
            throw new NotFoundError("Usuário não encontrado")
          }
          return res.json(user)
        } catch (error: unknown) {
          next(error)
        }
      }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id)
            if (isNaN(id)) {
                throw new NotFoundError("ID inválido")
            }
            const result = await this.userRepository.delete(id)
            if (result.affected === 0) {
                throw new NotFoundError("Usuário não encontrado!")
            }
            return res.status(204).send()
          } catch(error: unknown) {
            next (error)
        }
    }

    toggleActive = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const id = Number(req.params.id)
          if (isNaN(id)) {
            throw new BadRequestError("ID inválido")
          }
          const user = await this.userRepository.findOneBy({ id })
          if (!user) {
            throw new NotFoundError("Usuário não encontrado")
          }
          user.isActive = !user.isActive;
          await this.userRepository.save(user)
          return res.json({
            message: `Usuário ${
              user.isActive ? "ativado" : "desativado"
            } com sucesso.`,
            user,
          });
        } catch (error: unknown) {
          next(error)
        }
      }
}