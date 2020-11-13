import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from '../model/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) {
  }

  all() { return this.http.get('/api/albums/all').toPromise() }
  get(id: string) { return this.http.get(`/api/album/${id}`).toPromise() }
  put(album: Album) {
    return this.http.put(`/api/album/${album._id}`,
      {
        title: album.title,
        "artistId": album.artistId,
        "coverUrl": album.coverUrl,
        "year": album.year,
        "genre": album.genre
      }).toPromise()
  }
  delete(id: string) { return this.http.delete(`/api/album/${id}`).toPromise() }
  post(album: Album);
  post(albums: Array<Album>);
  post(param: any) {
    if (param)
      if (Array.isArray(param))
        return this.http.post('/api/albums', param).toPromise();
      else
        return this.http.post('/api/album', param).toPromise();
  }
}
