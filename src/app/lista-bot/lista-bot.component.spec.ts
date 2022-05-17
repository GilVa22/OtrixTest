import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBotComponent } from './lista-bot.component';

describe('ListaBotComponent', () => {
  let component: ListaBotComponent;
  let fixture: ComponentFixture<ListaBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaBotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
