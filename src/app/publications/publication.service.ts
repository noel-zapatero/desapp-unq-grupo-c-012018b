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

    publish(publication:Publication): Observable<Publication> {
        return this.http.post<Publication>(
            this.URL,
            publication,
            this.httpOptions
        );
    }

    getAllPublicationsFromUserEmail(userEmail:String):Observable<Publication[]> {
        return this.http.get<Publication[]>(
            this.URL + '/fromuser/' + userEmail,
            this.httpOptions
        )
    }

}