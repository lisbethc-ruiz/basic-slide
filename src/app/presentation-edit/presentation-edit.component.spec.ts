import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from "@angular/forms";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

import { PresentationEditComponent } from './presentation-edit.component';

describe('PresentationEditComponent', () => {
  let component: PresentationEditComponent;
  let fixture: ComponentFixture<PresentationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      RouterTestingModule,
      HttpClientTestingModule,
      HttpClientModule,
      FormsModule
    ],
      declarations: [ PresentationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
