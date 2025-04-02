import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutConfiguratorComponent } from './layout-configurator.component';

describe('LayoutConfiguratorComponent', () => {
  let component: LayoutConfiguratorComponent;
  let fixture: ComponentFixture<LayoutConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutConfiguratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
