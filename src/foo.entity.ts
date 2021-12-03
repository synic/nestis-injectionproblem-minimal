import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Foo {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
