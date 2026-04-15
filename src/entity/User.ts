import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  firstName!: string;

  @Column("varchar")
  lastName!: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;
}