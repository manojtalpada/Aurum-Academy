import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgoteComponent } from './forgote.component';

describe('ForgoteComponent', () => {
  let component: ForgoteComponent;
  let fixture: ComponentFixture<ForgoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
