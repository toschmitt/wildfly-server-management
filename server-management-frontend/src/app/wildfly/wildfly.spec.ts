import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wildfly } from './wildfly';

describe('Wildfly', () => {
  let component: Wildfly;
  let fixture: ComponentFixture<Wildfly>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wildfly],
    }).compileComponents();

    fixture = TestBed.createComponent(Wildfly);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
