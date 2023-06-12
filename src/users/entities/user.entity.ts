import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  checkPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Ticket, (ticket: Ticket) => ticket.author)
  tickets: Ticket[];
}
