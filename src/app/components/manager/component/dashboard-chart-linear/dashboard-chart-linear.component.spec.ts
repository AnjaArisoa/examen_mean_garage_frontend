import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChartLinearComponent } from './dashboard-chart-linear.component';

describe('DashboardChartLinearComponent', () => {
  let component: DashboardChartLinearComponent;
  let fixture: ComponentFixture<DashboardChartLinearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardChartLinearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardChartLinearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
