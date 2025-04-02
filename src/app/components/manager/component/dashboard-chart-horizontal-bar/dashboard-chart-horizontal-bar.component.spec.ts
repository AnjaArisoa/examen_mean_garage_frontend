import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChartHorizontalBarComponent } from './dashboard-chart-horizontal-bar.component';

describe('DashboardChartHorizontalBarComponent', () => {
  let component: DashboardChartHorizontalBarComponent;
  let fixture: ComponentFixture<DashboardChartHorizontalBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardChartHorizontalBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardChartHorizontalBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
