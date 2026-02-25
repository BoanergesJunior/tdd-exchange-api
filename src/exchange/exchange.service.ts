import { BadRequestException, Injectable } from '@nestjs/common';

type ConvertAmountParams = {
  from: string;
  to: string;
  amount: number;
}

@Injectable()
export class CurrencyService {
  async getCurrency(currency: string): Promise<any> { }
}

@Injectable()
export class ExchangeService {
  constructor(private readonly currencyService: CurrencyService) { }

  async convertAmount({ from, to, amount }: ConvertAmountParams): Promise<any> {
    if (!from || !to || !amount) {
      throw new BadRequestException();
    }

    const fromConverted = await this.currencyService.getCurrency(from)
    const toConverted = await this.currencyService.getCurrency(to)
  }
}
