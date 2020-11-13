import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})

export class ArtistsComponent implements OnInit {

  constructor(public http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addArtist(): void { }

}
