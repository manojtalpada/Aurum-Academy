import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalDemoComponent } from './paypal-demo.component';

describe('PaypalDemoComponent', () => {
  let component: PaypalDemoComponent;
  let fixture: ComponentFixture<PaypalDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
