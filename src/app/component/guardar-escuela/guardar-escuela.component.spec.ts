import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarEscuelaComponent } from './guardar-escuela.component';

describe('GuardarEscuelaComponent', () => {
  let component: GuardarEscuelaComponent;
  let fixture: ComponentFixture<GuardarEscuelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarEscuelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarEscuelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
