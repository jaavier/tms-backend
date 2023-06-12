import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

export class TicketDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsDate()
  date: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
