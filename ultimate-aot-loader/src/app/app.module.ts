import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';

@NgModule({
    imports: [BrowserModule],
    exports: [],
    declarations: [AppComponent, ChildComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
