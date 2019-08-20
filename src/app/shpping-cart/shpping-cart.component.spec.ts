import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShppingCartComponent } from './shpping-cart.component';

describe('ShppingCartComponent', () => {
  let component: ShppingCartComponent;
  let fixture: ComponentFixture<ShppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShppingCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
