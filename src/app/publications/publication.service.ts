import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Publication } from "../model/publication.model";
import { Reservation } from "../model/reservation.model";

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

    deletePublication(publicationId:number): Observable<boolean> {
        return this.http.delete<boolean>(
            this.URL + '/' + publicationId,
            this.httpOptions
        )
    }

    getAllPublicationsFromUserEmail(userEmail:String):Observable<Publication[]> {
        return this.http.get<Publication[]>(
            this.URL + '/fromuser/' + userEmail,
            this.httpOptions
        );
    }

    getPublicationById(pubId: number) :Observable<Publication> {
        return this.http.get<Publication>(
            this.URL + '/' + pubId.toString(),
            this.httpOptions
        )
    };

    isOwner(userEmail:string, pubId:number):Observable<boolean> {
        return this.http.get<boolean>(
            this.URL + '/isowner/' + userEmail + '/' + pubId,
            this.httpOptions
        );
    }

    getAllPublications():Observable<Publication[]> {
        return this.http.get<Publication[]>(
            this.URL,
            this.httpOptions
        );
    }
}