import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoCartaComponent } from './pedido-carta.component';

describe('PedidoCartaComponent', () => {
  let component: PedidoCartaComponent;
  let fixture: ComponentFixture<PedidoCartaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoCartaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoCartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
