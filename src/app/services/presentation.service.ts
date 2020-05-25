import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
  })
export class PresentationService {
    urlFiles = environment.urlFiles;
    urlPresentationAPI = `${environment.urlServerAPI}presentations`;

    constructor(private http: HttpClient) {}

    getFile(fileName) {
        return this.http.get(this.urlFiles + fileName, {responseType: 'text'}) 
        .toPromise()
        .catch(this.handleError);
    }

    getPresentations() {
        return this.http.get(`${this.urlPresentationAPI}`)
        .toPromise()
        .catch(this.handleError);
    }

    getPresentation(name) {
        return this.http.get(`${this.urlPresentationAPI}/${name}`, { responseType: 'text' })
        .toPromise()
        .catch(this.handleError);
    }

    savePresentation(body) 
    {
       return this.http.post(`${this.urlPresentationAPI}/save`, body)
       .toPromise()
       .catch(this.handleError);
    }
  
    private handleError(error: any): Promise<any> {
        console.log("Error received from api server", error);
       return Promise.reject(error.message || error);
    }
}
