import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: any[];
  years: Array<Number>;

  constructor(private _http: HttpClient) {
    this.years = Array(147).fill(0).map((x,i)=>2018-i);
  }

  ngOnInit() {
    this._http.get(environment.apiPrefix + '/matches/search/findAllByYearOrderByDateDesc?year=2018')
      .subscribe(data => {
        console.log(data);
        this.matches = data['_embedded']['matches'];
      });
  }

}
