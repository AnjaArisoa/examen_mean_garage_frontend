import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMenuitemComponent } from './layout-menuitem.component';

describe('LayoutMenuitemComponent', () => {
  let component: LayoutMenuitemComponent;
  let fixture: ComponentFixture<LayoutMenuitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutMenuitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutMenuitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
