import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: any[];

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {
    this._http.get(environment.apiPrefix + '/teams')
      .subscribe(data => {
        console.log(data);
        this.teams = data['_embedded']['teams'];
      });
  }
}
