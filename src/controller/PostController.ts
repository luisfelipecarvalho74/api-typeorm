import { AppDataSource } from "../data-source"
import type { NextFunction, Request, Response } from "express"
import { Post } from "../entity/Post"
import { User } from "../entity/User"
import { BadRequestError, NotFoundError } from "../helpers/apiError"
import { validate } from "class-validator"
import { IValidationError } from "../types/IvalidationError"
import { formatErrors } from "../helpers/formatErrors"
import { nextTick, title } from "node:process"

export class PostController {
  private postRepository = AppDataSource.getRepository(Post)
  private userRepository = AppDataSource.getRepository(User)

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.postRepository.find({ relations: ["user"] })
      return res.json(posts)
    } catch (error: unknown) {
      next(error)
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, content, userId } = req.body
      if (isNaN(userId)) {
        throw new BadRequestError("Id do usuário inválido")
      }
      const user = await this.userRepository.findOneBy({ id: userId })
      if (!user) {
        throw new NotFoundError("Usuário não encontrado.")
      }
      const newPost = this.postRepository.create({ title, content, user })
      const errors = await validate(newPost)
      if (errors.length > 0) {
        const formattedErrors = formatErrors(errors)
        throw new BadRequestError("Falha na verificação!", formattedErrors)
      }
      await this.postRepository.save(newPost)
      return res.status(201).json(newPost)
    } catch (error: unknown) {
      next(error)
    }
  }

  async update (req: Request, res: Response, NextFunction) {
    try {
      const id = Number(req.params.id)
      const { title, content } = req.body
      if (isNaN(id)) {
        throw new BadRequestError("ID inválido")
      }
      const post = await this.postRepository.findOneBy({ id })
      if (!post) {
        throw new NotFoundError("Post não encontrado")
      }
      post.title = title ?? post.title
      post.content = content ?? post.content
      const errors = await validate(post)
      if (errors.length > 0) {
        const formattedErrors = formatErrors(errors)
        throw new BadRequestError("Falha na verificação", formattedErrors)
      }
      await this.postRepository.save(post)
      return res.json(post)
    } catch (error: unknown) {
      next(error)
    }
  }

  async delet (req:Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const post = await this.postRepository.findOneBy({ id })
      if (!post) {
        throw new NotFoundError("Post não encontrado.")
      }
      await this.postRepository.delete(id)
      return res.status(204).send()
    } catch (error: unknown) {
      next(error)
    }
  }
}