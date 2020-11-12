export class Album {
    //required: true
    _id: string;

    // required: true
    title: string;

    artistId: string;
    coverUrl: string;

    // minimum: 1909
    // maximum: 2030
    year: number;

    genre: string;
    _createdA: string
    _updatedAt: string;
}