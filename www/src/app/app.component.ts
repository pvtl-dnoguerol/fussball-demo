import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'International Soccer Matches';
  matches: any[];
  years: Array<Number>;

  constructor(private _http: HttpClient) {
    this.years = Array(147).fill(0).map((x,i)=>2018-i);
  }

  ngOnInit() {
    this._http.get(environment.apiPrefix + '/matches/search/findAllByYearOrderByDateDesc?year=2018&size=200')
      .subscribe(data => {
        this.matches = data['_embedded']['matches'];
      });
  }
}
