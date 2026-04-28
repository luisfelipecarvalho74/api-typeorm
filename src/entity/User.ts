import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Post } from "./Post"
import { IsNotEmpty, IsString, Validate } from "class-validator"
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

  @Column({ type: "varchar", length: 15, nullable: false })
  @IsNotEmpty({ message: "O celular é obrigatório" })
  @Validate(IsBrPhoneConstraint)
  phone!: string

  @Column({ type: "boolean", default: true })
  isActive!: boolean
  // Um usuário pode ter vários posts
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]
}