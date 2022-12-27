import { Survey } from "src/surveys/entities/survey.entity";
import { Column, Entity, Generated, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    length: 30,
  })
  id: string

  @Column({
    name: 'name',
    type: 'varchar',
    length: 64,
  })
  name: string

  @Column({
    name: 'class',
    type: 'varchar',
    length: 8,
  })
  class_: string

  @Column({
    name: 'section',
    type: 'varchar',
    length: 8,
  })
  section: string

  @ManyToMany(() => Survey, survey => survey.students, {cascade: true})
  surveys: Survey[]
}