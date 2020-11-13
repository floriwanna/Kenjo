import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListElement } from 'src/app/model/list-element.model';
import { Album } from 'src/app/model/album.model';
import { CustomValidators } from '../../custom-validator';

import { AppValues } from '../../app-values';
import { AlbumService } from 'src/app/service/album.service';
@Component({
  selector: 'app-dialog-album-form',
  templateUrl: './dialog-album-form.component.html',
  styleUrls: ['./dialog-album-form.component.scss']
})

export class DialogAlbumFormComponent implements OnInit {


  artists;
  albumForm;
  status;
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private albumService: AlbumService,
    public dialogRef: MatDialogRef<DialogAlbumFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListElement
  ) {

    this.status = !data ? AppValues.DIALOG_STATUS.CREATE : AppValues.DIALOG_STATUS.UPDATE;

    if (data) {
      this.albumService.get(data._id).then((x: Album) => {
        this.albumForm.patchValue({
          year: x.year,
          genre: x.genre
        })
      })
    }

    this.albumForm = this.formBuilder.group({
      _id: data ? data._id : '',
      title: [data ? data.title : '', Validators.required],
      artistId: '',
      coverUrl: data ? data.img_url : '',

      // minimum: 1909
      // maximum: 2030
      year: ["", CustomValidators.number({ min: 1090, max: 2030 })],
      genre: [''],
      // _createdA: '',
      // _updatedAt: '',
    })
  }

  ngOnInit(): void {
    this.albumService.all().then(x => {
      this.artists = x;
    })
  }

  isCreate(): boolean {
    return this.status == AppValues.DIALOG_STATUS.CREATE;
  }

  onSubmit(): void {
    if (this.albumForm.status == "VALID") {
      let artistId = this.albumForm.value.artistId == '' ? null : this.albumForm.value.artistId;
      let new_album = {
        title: this.albumForm.value.title,
        artistId: artistId,
        coverUrl: this.albumForm.value.coverUrl,
        year: this.albumForm.value.year,
        genre: this.albumForm.value.genre
      } as Album;

      if (this.data) {
        new_album._id = this.data._id;
        this.albumService.put(new_album).then(x => {
          console.log(x)
          // this.dialogRef.close(this.albumForm.value);
          this.dialogRef.close(x);

        }).catch(err => { console.error(err) });

      } else {
        this.albumService.post(new_album).toPromise().then(x => {
          console.log(x)
          // this.dialogRef.close(this.albumForm.value);
          this.dialogRef.close(x);

        }).catch(err => { console.error(err) });

      }
    }
  }
}
