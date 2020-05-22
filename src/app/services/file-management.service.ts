import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,  throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
  })
export class FileManagementService {

    urlFiles = environment.urlFiles;

    constructor(private http: HttpClient) {
    }

    getFile(fileName) {
        // now returns an Observable of Config
        return this.http.get(this.urlFiles + fileName, {responseType: 'text'});
    }
}
