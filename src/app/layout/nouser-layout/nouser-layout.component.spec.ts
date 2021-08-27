import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouserLayoutComponent } from './nouser-layout.component';

describe('NouserLayoutComponent', () => {
  let component: NouserLayoutComponent;
  let fixture: ComponentFixture<NouserLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouserLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
