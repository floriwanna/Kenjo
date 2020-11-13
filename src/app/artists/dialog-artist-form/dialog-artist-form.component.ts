import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListElement } from 'src/app/model/list-element.model';
import { Artist } from './../../model/artist.model';
import { AppValues } from 'src/app/app-values';
import { ArtistService } from '../../service/artist.service';
@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-artist-form.component.html',
  styleUrls: ['./dialog-artist-form.component.scss']
})
export class DialogArtistFormComponent implements OnInit {

  artistForm;
  status;
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private artistService: ArtistService,
    public dialogRef: MatDialogRef<DialogArtistFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListElement
  ) {


    this.status = !data ? AppValues.DIALOG_STATUS.CREATE : AppValues.DIALOG_STATUS.UPDATE;
    console.warn('debo revisar el modelo del docker')
    if (data) {
      this.artistService.get(data._id).then((x: Artist) => {
        this.artistForm.patchValue({
        })
      })
    }

    this.artistForm = this.formBuilder.group({
      _id: data ? data._id : '',
      title: [data ? data.title : '', Validators.required],
      artistId: '',
      coverUrl: data ? data.img_url : '',
    })
  }

  ngOnInit(): void {
  }

  onSubmit() { return true; }

}
