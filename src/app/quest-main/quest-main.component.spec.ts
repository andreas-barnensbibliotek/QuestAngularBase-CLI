import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestMainComponent } from './quest-main.component';

describe('QuestMainComponent', () => {
  let component: QuestMainComponent;
  let fixture: ComponentFixture<QuestMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
