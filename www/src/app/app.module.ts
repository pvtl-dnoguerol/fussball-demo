import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AgmCoreModule } from '@agm/core';
import { MatchesComponent } from './matches/matches.component';
import { TeamsComponent } from './teams/teams.component';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  	AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey
    })
  ],
  providers: [],
  declarations: [ AppComponent, MatchesComponent, TeamsComponent, MapComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
