import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPerfilComponent } from './panel-perfil.component';

describe('PanelPerfilComponent', () => {
  let component: PanelPerfilComponent;
  let fixture: ComponentFixture<PanelPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
