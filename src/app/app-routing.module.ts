import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { ArtistsComponent } from './artists/artists.component';

const routes: Routes = [
  {
    path: 'artists',
    component: ArtistsComponent,
    data: { title: 'Artists' }
  }, {
    path: 'albums',
    component: AlbumComponent,
    data: { title: 'Albums' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
