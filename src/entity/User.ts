import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Post } from "./Post"
import { IsEmail, IsNotEmpty, IsString, Validate } from "class-validator"
import { IsBrPhoneConstraint } from "../decorators/isBrPhone"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column("varchar")
  @IsNotEmpty({ message: "Primeiro nome é obrigatório!" })
  @IsString({ message: "Primeiro nome precisa ser um texto" })
  firstName!: string

  @Column("varchar")
  @IsNotEmpty({ message: "Sobrenome é obrigatório!" })
  @IsString({ message: "Sobrenome precisa ser um texto" })
  lastName!: string

 @Column("varchar", { unique: true })
 @IsNotEmpty()
 @IsEmail({}, { message: "O email fornecido não é válido" })
 email!: string

  @Column({ type: "boolean", default: true })
  isActive!: boolean
  // Um usuário pode ter vários posts
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]
}