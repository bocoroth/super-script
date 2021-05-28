import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditBoxComponent } from './edit-box.component';

describe('EditBoxComponent', () => {
  let component: EditBoxComponent;
  let fixture: ComponentFixture<EditBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
