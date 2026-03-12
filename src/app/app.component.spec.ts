import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([]), NoopAnimationsModule],
      providers: [
        provideMockStore({
          initialState: {
            user: { balance: 500000 },
            funds: { funds: [], loading: false, error: null },
            transactions: { transactions: [] },
          },
        }),
      ],
    }).compileComponents();
  });

  /** Test component creation */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
