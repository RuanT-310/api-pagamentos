import { Test, TestingModule } from '@nestjs/testing';
import { MpPayment } from './mp-payment';

describe('MpPayment', () => {
  let provider: MpPayment;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MpPayment],
    }).compile();

    provider = module.get<MpPayment>(MpPayment);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
