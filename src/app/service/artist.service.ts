import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artist } from '../model/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) {
  }

  all() { return this.http.get('/api/artist/all').toPromise() }
  get(id: string) { return this.http.get(`/api/artist/${id}`).toPromise() }
  put(artist: Artist) {
    return this.http.put(`/api/artist/${artist._id}`,
      {
        "name": artist.name,
        "artistId": artist._id,
        "photoUrl": artist.photoUrl,
        "birthdate": artist.birthdate,
        "deathDate": artist.deathDate,
      }).toPromise()
  }
  delete(id: string) { return this.http.delete(`/api/artist/${id}`).toPromise() }
  post(artist: Artist);
  post(artist: Array<Artist>);
  post(param: any) {
    if (param)
      if (Array.isArray(param))
        return this.http.post('/api/artist', param).toPromise();
      else
        return this.http.post('/api/artist', param).toPromise();
  }
}
