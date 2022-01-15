import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zipCode: string;

  @Column()
  zipCity: string;

  @Column()
  name: string;

  @Column()
  label: string;
}
