import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogArtistFormComponent } from './dialog-artist-form.component';

describe('DialogArtistFormComponent', () => {
  let component: DialogArtistFormComponent;
  let fixture: ComponentFixture<DialogArtistFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogArtistFormComponent],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogArtistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
