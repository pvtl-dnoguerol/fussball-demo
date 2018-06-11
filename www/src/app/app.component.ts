import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  locale = 'de';

  constructor() {
    const path: string = location.pathname.toString();
    if (path.startsWith('/en/')) {
      this.locale = 'en';
    } else if (path.startsWith('/nl/')) {
      this.locale = 'nl';
    }
  }

  onLocaleChange(value) {
    window.location.href = '/' + value + '/';
  }
}
