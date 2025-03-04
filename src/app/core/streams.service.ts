import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Stream {
  id: number;
  streamName: string;
}

@Injectable({
  providedIn: 'root',
})
export class StreamsService {
  private apiUrl = 'http://172.16.8.12:8763/api/config/streams';

  constructor(private http: HttpClient) {}

  getStreams(): Observable<Stream[]> {
    return this.http.get<Stream[]>(this.apiUrl);
  }
}
