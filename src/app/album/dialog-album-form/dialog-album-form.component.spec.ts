import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DialogAlbumFormComponent } from './dialog-album-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppValues } from 'src/app/app-values';
import { Album } from 'src/app/model/album.model';
import { ListElement } from 'src/app/model/list-element.model';

describe('DialogAlbumFormComponent', () => {
  let component: DialogAlbumFormComponent;
  let fixture: ComponentFixture<DialogAlbumFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAlbumFormComponent],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
      ], providers: [
        {
          // I was expecting this will pass the desired value
          provide: MAT_DIALOG_DATA
        }
      ]
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

  describe('on create', () => {
    it('status should be CREATE', () => {
      expect(component.status).toEqual(AppValues.DIALOG_STATUS.CREATE);
    })
    it('show artist field on create', () => {
      component.status = AppValues.DIALOG_STATUS.CREATE;

      // obtener el html
      // expect que este el select de artistas 
    });
  })

  describe('on update', () => {
    // revisar como pasarle por parametro al constructor
    // si lo encuentro puedo quitarle esos sets de app values

    it('status should be UPDATE', () => {
      expect(component.status).toEqual(AppValues.DIALOG_STATUS.UPDATE);
    })

    it('hide artist field on edit', () => {
      component.status = AppValues.DIALOG_STATUS.UPDATE;

      // obtener el html
      // expect que NO este el select de artistas 
    })
  });

  describe('HttpClient', () => {
    it('get album data', () => {
      let mockAlbum = {
        _id: '21k2939102j4lk3',
        year: 2000,
        artistId: 'j5lk234j8923j4',
        coverUrl: 'http://img.url.com',
        genre: 'Test',
        title: 'Coffe test'
      } as Album;

      let mockListElement = {
        _id: '21k2939102j4lk3',
        img_url: 'http://img.url.com',
        title: 'Coffe test'
      }
      // buscar como injectar MAT_DIALOG_DATA en el test
      // Injectar listElement en el constructor

      // Como hacer mock del httpClient
    })
  });
});
