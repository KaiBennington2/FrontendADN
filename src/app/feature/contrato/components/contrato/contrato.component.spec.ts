import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoComponent } from './contrato.component';

describe('(5) - Test del componente "ContratoComponent"', () => {
  let component: ContratoComponent;
  let fixture: ComponentFixture<ContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear componente', () => {
    expect(component).toBeTruthy();
  });
});
