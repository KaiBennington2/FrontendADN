import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { ContratoService } from '@feature/contrato/shared/service/contrato.service';

import { ListarContratoComponent } from './listar-contrato.component';

describe('ListarContratoComponent', () => {
  let component: ListarContratoComponent;
  let fixture: ComponentFixture<ListarContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarContratoComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ContratoService,
        HttpService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
