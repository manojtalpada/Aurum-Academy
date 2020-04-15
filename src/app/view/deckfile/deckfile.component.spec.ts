import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckfileComponent } from './deckfile.component';

describe('DeckfileComponent', () => {
  let component: DeckfileComponent;
  let fixture: ComponentFixture<DeckfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
