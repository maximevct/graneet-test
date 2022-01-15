import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zipCode: number;

  @Column()
  zipCity: number;

  @Column()
  name: string;

  @Column()
  label: string;
}
