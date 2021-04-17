import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class OmdbapiService {
  constructor(private http: HttpService) {}

  async searchByTitle(title: string, page: number): Promise<any> {
    return this.http.request({
      params: {
        apikey: process.env.MOVIE_API_KEY,
        s: title,
        page: page
      }
    }).pipe(
      map( response => response.data)
    )
  }

  async getById(id: string): Promise<any> {
    return this.http.request({
      params: {
        apikey: process.env.MOVIE_API_KEY,
        i: id,
      }
    }).pipe(
      map( response => response.data)
    )
  }
}
