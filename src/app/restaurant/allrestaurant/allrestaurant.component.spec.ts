import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllrestaurantComponent } from './allrestaurant.component';

describe('AllrestaurantComponent', () => {
  let component: AllrestaurantComponent;
  let fixture: ComponentFixture<AllrestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllrestaurantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllrestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
