import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
  // @Column()
  // @Generated('increment')
  // id: string

  @PrimaryColumn({
    name: 'user',
    type: 'varchar',
    length: 64,
  })
  user: string

  @Column({
    name: 'email',
    type: 'varchar',
    length: 64,
  })
  email: string

  @Column({
    name: 'password',
    type: 'varchar',
    length: 64,
  })
  password: string
}
