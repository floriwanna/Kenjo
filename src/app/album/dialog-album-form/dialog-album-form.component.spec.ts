import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAlbumFormComponent } from './dialog-album-form.component';

describe('DialogAlbumFormComponent', () => {
  let component: DialogAlbumFormComponent;
  let fixture: ComponentFixture<DialogAlbumFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAlbumFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAlbumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
