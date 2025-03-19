import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancementClientComponent } from './avancement-client.component';

describe('AvancementClientComponent', () => {
  let component: AvancementClientComponent;
  let fixture: ComponentFixture<AvancementClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvancementClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvancementClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
