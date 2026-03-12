import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundsPageComponent } from './funds-page.component';
import { provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  selectAllFunds,
  selectFundsLoading,
} from '../../../../core/store/funds/funds.selectors';
import { selectUserBalance } from '../../../../core/store/user/user.selectors';

describe('FundsPageComponent', () => {
  let component: FundsPageComponent;
  let fixture: ComponentFixture<FundsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundsPageComponent, NoopAnimationsModule],
      providers: [
        provideMockStore({
          initialState: {
            funds: { funds: [], loading: false, error: null },
            user: { balance: 500000 },
            transactions: { transactions: [] },
          },
          selectors: [
            { selector: selectAllFunds, value: [] },
            { selector: selectFundsLoading, value: false },
            { selector: selectUserBalance, value: 500000 },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FundsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
