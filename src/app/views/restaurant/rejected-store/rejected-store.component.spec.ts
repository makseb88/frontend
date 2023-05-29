import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedStoreComponent } from './rejected-store.component';

describe('RejectedStoreComponent', () => {
  let component: RejectedStoreComponent;
  let fixture: ComponentFixture<RejectedStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
