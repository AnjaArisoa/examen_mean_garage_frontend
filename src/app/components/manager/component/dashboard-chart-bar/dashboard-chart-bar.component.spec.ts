import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChartBarComponent } from './dashboard-chart-bar.component';

describe('DashboardChartBarComponent', () => {
  let component: DashboardChartBarComponent;
  let fixture: ComponentFixture<DashboardChartBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardChartBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardChartBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
