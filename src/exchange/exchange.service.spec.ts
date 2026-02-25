import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeService } from './exchange.service';
import { BadRequestException } from '@nestjs/common';
import { CurrencyService } from './exchange.service';

describe('ExchangeService', () => {
  let exchangeService: ExchangeService;
  let currencyService: CurrencyService

  beforeEach(async () => {
    const currencyServiceMock = {
      getCurrency: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeService,
        { provide: CurrencyService, useValue: currencyServiceMock }
      ],
    }).compile();

    exchangeService = module.get<ExchangeService>(ExchangeService);
    currencyService = module.get<CurrencyService>(CurrencyService);

  });

  it('should be defined', () => {
    expect(exchangeService).toBeDefined();
  });

  describe("convertAmout()", () => {
    it("should throw if called with invalid parameters", async () => {
      await expect(exchangeService.convertAmount({ from: "", to: "", amount: 0 })).rejects.toThrow(new BadRequestException());
    })

    it("should not throw if called with valid parameters", async () => {
      await expect(exchangeService.convertAmount({ from: "USD", to: "BRL", amount: 100 })).resolves.not.toThrow()
    })

    it("should call getCurrecy twice", async () => {
      await exchangeService.convertAmount({ from: "USD", to: "BRL", amount: 100 })
      expect(currencyService.getCurrency).toHaveBeenCalledTimes(2)
    })

    it("should call getCurrecy twice with correct parameters", async () => {
      await exchangeService.convertAmount({ from: "USD", to: "BRL", amount: 100 })
      expect(currencyService.getCurrency).toHaveBeenNthCalledWith(1, "USD")
      expect(currencyService.getCurrency).toHaveBeenNthCalledWith(2, "BRL")
    })
  })
});
