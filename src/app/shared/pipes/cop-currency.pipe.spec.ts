import { CopCurrencyPipe } from './cop-currency.pipe';

describe('CopCurrencyPipe', () => {
  let pipe: CopCurrencyPipe;

  beforeEach(() => {
    pipe = new CopCurrencyPipe();
  });

  /** Test pipe creation */
  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  /** Test null value returns $ 0 */
  it('should return $ 0 when value is null', () => {
    expect(pipe.transform(null)).toBe('$ 0');
  });

  /** Test undefined value returns $ 0 */
  it('should return $ 0 when value is undefined', () => {
    expect(pipe.transform(undefined)).toBe('$ 0');
  });

  /** Test formats 500000 correctly */
  it('should format 500000 as COP currency', () => {
    const result = pipe.transform(500000);
    expect(result).toContain('500.000');
  });

  /** Test formats 75000 correctly */
  it('should format 75000 as COP currency', () => {
    const result = pipe.transform(75000);
    expect(result).toContain('75.000');
  });

  /** Test formats 0 correctly */
  it('should format 0 as COP currency', () => {
    const result = pipe.transform(0);
    expect(result).toContain('0');
  });
});
