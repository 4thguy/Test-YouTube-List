import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Video } from './video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(
    private http: HttpClient
  ) { }

  private videosUrl = 'api/videos';  // URL to web api

  getHeroes (): Observable<Video[]> {
    return this.http.get<Video[]>(this.videosUrl)
  }
}
