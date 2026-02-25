import { BadRequestException, Injectable } from '@nestjs/common';

type ConvertAmountParams = {
  from: string;
  to: string;
  amount: number;
}

@Injectable()
export class ExchangeService {

  async convertAmount({ from, to, amount }: ConvertAmountParams) {
    if (!from || !to || !amount) {
      throw new BadRequestException();
    }
  }
}
