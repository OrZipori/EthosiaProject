import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './user';
import { Headers, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NetworkingService {

  constructor(private http: Http) {}

  public register(user: User): Promise<Response> {
    var data = new URLSearchParams();

    data.set('id', user.id);
    data.set('firstName', user.firstName);
    data.set('lastName', user.lastName);
    data.set('email', user.email);
    data.set('headline', user.headline);
    data.set('cellphone', user.cellphone);

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post('/api/register',
        data.toString(), {
          headers: headers
        }).toPromise();
  }

  public pullData(id: string): Promise<Response> {
    return this.http.get('/api/fetch/' + id).toPromise();
  }
}
