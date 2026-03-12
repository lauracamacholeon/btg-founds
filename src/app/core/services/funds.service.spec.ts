import { TestBed } from '@angular/core/testing';
import { FundsService } from './funds.service';
import { MOCK_FUNDS, MOCK_USER } from './mock-data';

describe('FundsService', () => {
  let service: FundsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundsService);
  });

  /** Test service creation */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /** Test getFunds returns all funds */
  it('should return all available funds', (done) => {
    service.getFunds().subscribe((funds) => {
      expect(funds.length).toBe(MOCK_FUNDS.length);
      expect(funds).toEqual(MOCK_FUNDS);
      done();
    });
  });

  /** Test getFunds returns funds with correct structure */
  it('should return funds with correct properties', (done) => {
    service.getFunds().subscribe((funds) => {
      funds.forEach((fund) => {
        expect(fund.id).toBeDefined();
        expect(fund.name).toBeDefined();
        expect(fund.minimumAmount).toBeDefined();
        expect(fund.category).toBeDefined();
        expect(fund.isSubscribed).toBeDefined();
      });
      done();
    });
  });

  /** Test getUserBalance returns initial balance */
  it('should return initial user balance of 500000', (done) => {
    service.getUserBalance().subscribe((balance) => {
      expect(balance).toBe(MOCK_USER.balance);
      expect(balance).toBe(500000);
      done();
    });
  });

  /** Test getTransactions returns empty array initially */
  it('should return empty transactions array initially', (done) => {
    service.getTransactions().subscribe((transactions) => {
      expect(transactions).toEqual([]);
      expect(transactions.length).toBe(0);
      done();
    });
  });

  /** Test getFunds returns FPV and FIC categories */
  it('should return funds with FPV and FIC categories', (done) => {
    service.getFunds().subscribe((funds) => {
      const fpvFunds = funds.filter((f) => f.category === 'FPV');
      const ficFunds = funds.filter((f) => f.category === 'FIC');
      expect(fpvFunds.length).toBeGreaterThan(0);
      expect(ficFunds.length).toBeGreaterThan(0);
      done();
    });
  });
});
