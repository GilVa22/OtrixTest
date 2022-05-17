import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotsCardComponent } from './bots-card.component';

describe('BotsCardComponent', () => {
  let component: BotsCardComponent;
  let fixture: ComponentFixture<BotsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
