import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPrecioCardComponent } from './lista-precio-card.component';

describe('ListaPrecioCardComponent', () => {
  let component: ListaPrecioCardComponent;
  let fixture: ComponentFixture<ListaPrecioCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPrecioCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPrecioCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
