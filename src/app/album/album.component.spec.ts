import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Album } from '../model/album.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { AlbumComponent } from './album.component';

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;


  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.albums = []
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('dialog', () => {

    it('return undefined - close with out saving', () => {       // como mockear la accion del dialog
      // debe retornar un nuevo elemento para agregar a la lista
      let albumLength = component.albums.length;
      expect(albumLength).toEqual(albumLength + 1);
    })

    describe('open as ceate ', () => {
      it('return new element', () => {
        beforeEach(() => {
          component.albums = [{
            _id: 'oioiwepo32poj4j9203',
            year: 2000,
            artistId: 'j5lk234j8923j4',
            coverUrl: 'http://img.url.com',
            genre: 'Pop, Rock',
            title: 'Clasics test of all time'
          }]
        })
        // como mockear la accion del dialog
        let newAlbum = {
          _id: '032lkj4j9203',
          year: 2000,
          artistId: 'j5lk234j8923j4',
          coverUrl: 'http://img.url.com',
          genre: 'Jazz',
          title: 'Jazz test'
        } as Album;

        // debe retornar un nuevo elemento para agregar a la lista
        let albumLength = component.albums.length;
        expect(albumLength).toEqual(albumLength + 1);
      })
    })

    describe('open as update', () => {
      it('return album modified', () => {
        let listElements = [{
          _id: '032lkj4j9203',
          img_url: 'http://img.url.com',
          title: 'Jazz test'
        }, {
          _id: 'hh45J0943I53j4',
          img_url: 'http://img.rock-url.com',
          title: 'Rock disc test'
        }]
        let mockDialogRes = {
          _id: 'hh45J0943I53j4',
          year: 2000,
          artistId: 'j5lk234j8923j4',
          coverUrl: 'http://img.url.com',
          genre: 'Pop',
          title: 'Pop disc'
        }

        // mockear la funcion de retorno
        // expect(listElements[1]).toBe diferent
      })
    })
  })
});
