import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListElement } from 'src/app/model/list-element.model';
import { Album } from 'src/app/model/album.model';
import { CustomValidators } from '../../custom-validator';

import { AppValues } from '../../app-values';
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
    public dialogRef: MatDialogRef<DialogAlbumFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListElement
  ) {

    this.status = !data ? AppValues.DIALOG_STATUS.CREATE : AppValues.DIALOG_STATUS.UPDATE;

    if (data) {
      this.httpClient.get(`/api/album/${data._id}`).toPromise().then((x: Album) => {
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
    this.httpClient.get('/api/artists/all').toPromise().then(x => {
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
      };

      if (this.data) {
        this.httpClient.put('/api/album', new_album).toPromise().then(x => {
          console.log(x)
          // this.dialogRef.close(this.albumForm.value);
          this.dialogRef.close(x);

        }).catch(err => { console.error(err) });

      } else {
        this.httpClient.post('/api/album', new_album).toPromise().then(x => {
          console.log(x)
          // this.dialogRef.close(this.albumForm.value);
          this.dialogRef.close(x);

        }).catch(err => { console.error(err) });

      }
    }
  }
}
