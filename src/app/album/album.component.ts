import { HttpClient } from '@angular/common/http';
import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { elementAt } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Album } from '../model/album.model';
import { ListElement } from '../model/list-element.model';
import { DialogAlbumFormComponent } from './dialog-album-form/dialog-album-form.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.http.get('/api/albums/all'))
    this.http.get('/api/albums/all').toPromise().then(res => {
      this.albums = (res as Array<any>).map(x => {
        return {
          _id: x._id, img_url: x.coverUrl, title: x.title
        } as ListElement;
      });
      console.log(this.albums)
    })
  }

  albums;

  addAlbum() {
    const dialogRef = this.dialog.open(DialogAlbumFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.albums.push(result);
    });
  }

  onRemove(listElement: ListElement) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {
        width: '250px',
        data: { message: `Remove Album ${listElement.title}?` }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.http.delete(`/api/album/${listElement._id}`).toPromise().then((res: Album) => {
          this.albums = this.albums.filter(f => f._id != res._id);
        });
    })
  }

  showMore(listElement: ListElement) {
    const dialogRef = this.dialog.open(DialogAlbumFormComponent, { data: listElement });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.albums.push({
          _id: result._id, img_url: result.coverUrl, title: result.title
        } as ListElement);
    });
  }
}
