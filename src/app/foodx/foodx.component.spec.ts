import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodxComponent } from './foodx.component';

describe('FoodxComponent', () => {
  let component: FoodxComponent;
  let fixture: ComponentFixture<FoodxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
