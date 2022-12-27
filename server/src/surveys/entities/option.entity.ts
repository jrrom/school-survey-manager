import { Student } from "src/students/entities/student.entity";
import { Column, Entity, Generated, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Survey } from "./survey.entity";

@Entity()
export class Option {
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    length: 64,
  })
  id: string

  @Column({
    name: 'section',
    type: 'varchar',
    length: 64,
  })
  section: string

  @Column({
    name: 'title',
    type: 'varchar',
    length: 64,
  })
  title: string

  @Column({
    name: 'type',
    type: 'varchar',
    length: 64,
  })
  type: string

  @Column({
    name: 'value',
    type: 'smallint',
  })
  value: number 

  @ManyToOne(() => Survey, survey => survey.options, {onDelete: 'CASCADE'})
  survey: Survey
}