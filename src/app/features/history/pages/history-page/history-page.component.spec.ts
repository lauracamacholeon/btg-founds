import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryPageComponent } from './history-page.component';
import { provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { selectAllTransactions } from '../../../../core/store/transactions/transactions.selectors';

describe('HistoryPageComponent', () => {
  let component: HistoryPageComponent;
  let fixture: ComponentFixture<HistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryPageComponent, NoopAnimationsModule],
      providers: [
        provideMockStore({
          initialState: {
            transactions: { transactions: [] },
          },
          selectors: [{ selector: selectAllTransactions, value: [] }],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
