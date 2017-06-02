import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
   value = `<span>Test interpolation {{5 + 6}}</span>`;
}