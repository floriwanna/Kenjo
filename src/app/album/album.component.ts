import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { elementAt } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Album } from '../model/album.model';
import { ListElement } from '../model/list-element.model';
import { DialogAlbumFormComponent } from './dialog-album-form/dialog-album-form.component';
import { AlbumService } from '../service/album.service';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  constructor(private http: HttpClient,
    private dialog: MatDialog,
    private albumService: AlbumService) { }

  ngOnInit(): void {
    this.albumService.all().then(res => {
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
        this.albumService.delete(listElement._id).then((res: Album) => {
          this.albums = this.albums.filter(f => f._id != res._id);
        });
    })
  }

  showMore(listElement: ListElement) {
    const dialogRef = this.dialog.open(DialogAlbumFormComponent, { data: listElement });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let i = this.albums.findIndex(x => x._id == result._id)
        this.albums[i].img_url = result.coverUrl;
        this.albums[i].title = result.title;
        this.albums[i]._id = result._id;
      };
    });
  }
}
