import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: any[];
  years: Array<Number>;
  pages: any[];
  currentPage: number;
  currentYear: number;

  constructor(private _http: HttpClient, private route: ActivatedRoute) {
    this.years = Array(147).fill(0).map((x,i)=>2018-i);
    this.currentYear = 2018;
    this.currentPage = 1;
    route.queryParams.subscribe((p: any) => {
      if (!isNaN(p['page'])) {
        this.currentPage = parseInt(p['page']);
        this.loadData();
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  onChange(year: number) {
    this.currentYear = year;
    this.currentPage = 1;
    this.loadData();
  }

  loadData() {
    const p: number = this.currentPage - 1;
    this._http.get(environment.apiPrefix + '/matches/search/findAllByYearOrderByDateDesc?year=' + this.currentYear + '&projection=matchSummary&page=' + p)
      .subscribe(data => {
        this.matches = data['_embedded']['matches'];
        this.currentPage = data['page']['number'];
        this.pages = Array(data['page']['totalPages']).fill(0).map((x, i) => i+1);
      });
  }

}
