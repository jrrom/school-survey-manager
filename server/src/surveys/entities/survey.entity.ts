import { Student } from "src/students/entities/student.entity";
import { Column, Entity, Generated, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Option } from "./option.entity";

@Entity()
export class Survey {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    name: 'title',
    type: 'varchar',
    length: 64,
  })
  title: string

  @Column({
    name: 'value',
    type: 'simple-json',
  })
  value: string

  @OneToMany(() => Option, option => option.survey, {cascade: true})
  options: Option[] 

  @ManyToMany(() => Student, student => student.surveys)
  @JoinTable({ name: "voters" })
  students: Student[]
}