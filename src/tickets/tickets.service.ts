import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketDTO } from './dto/ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticket: Repository<Ticket>,
  ) {}

  async findAll(): Promise<Ticket[]> {
    try {
      return await this.ticket.find({});
    } catch (error) {
      return error.message;
    }
  }

  async create(ticket: TicketDTO): Promise<boolean> {
    console.log(ticket);
    try {
      await this.ticket.save(ticket as unknown as Ticket);
      return true;
    } catch (err) {
      console.log('error:', err);
      return false;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, ticket: TicketDTO) {
    return `This action updates a #${ticket.id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
