import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogArtistFormComponent } from './dialog-artist-form.component';

describe('DialogFormComponent', () => {
  let component: DialogArtistFormComponent;
  let fixture: ComponentFixture<DialogArtistFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogArtistFormComponent]
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
