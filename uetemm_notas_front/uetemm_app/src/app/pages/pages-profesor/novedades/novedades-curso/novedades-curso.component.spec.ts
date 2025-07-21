import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadesCursoComponent } from './novedades-curso.component';

describe('NovedadesCursoComponent', () => {
  let component: NovedadesCursoComponent;
  let fixture: ComponentFixture<NovedadesCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NovedadesCursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovedadesCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
