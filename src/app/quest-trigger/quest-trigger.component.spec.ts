import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestTriggerComponent } from './quest-trigger.component';

describe('QuestTriggerComponent', () => {
  let component: QuestTriggerComponent;
  let fixture: ComponentFixture<QuestTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
