import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Publication } from "../model/publication.model";

@Injectable()
export class PublicationService {

    URL = 'http://localhost:8080/main/webservices/publications';

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
    }

    constructor(private http:HttpClient) {

    }

    publish(publication:Publication): Observable<boolean> {
        return this.http.post<boolean>(
            this.URL,
            publication,
            this.httpOptions
        )
    }

}