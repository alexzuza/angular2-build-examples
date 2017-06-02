import { NgModule, ApplicationRef, Compiler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { JitCompilerFactory } from '@angular/compiler';

import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import { HtmlOutlet } from './html-outlet';


export function createJitCompiler () {
    return new JitCompilerFactory([{useDebug: false, useJit: true}]).createCompiler();
}

@NgModule({
    imports: [BrowserModule],
    exports: [],
    declarations: [AppComponent, ChildComponent, HtmlOutlet],
    providers: [
        { provide: Compiler, useFactory: createJitCompiler}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) { }

    hmrOnInit(store) {
        if (!store || !store.rootState) return;
        if ('restoreInputValues' in store) { store.restoreInputValues(); }
        this.appRef.tick();
        Object.keys(store).forEach(prop => delete store[prop]);
    }

    hmrOnDestroy(store) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        store.disposeOldHosts = createNewHosts(cmpLocation);
        store.restoreInputValues = createInputTransfer();
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
