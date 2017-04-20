
import {enableProdMode} from '@angular/core';
import {platformBrowser} from '@angular/platform-browser';
import {AppModuleNgFactory} from '../dist/aot/src/app/app.module.ngfactory';

enableProdMode();


export function main() {
    return platformBrowser()
        .bootstrapModuleFactory(AppModuleNgFactory)
        .catch(err => console.log(err));
}

export function bootstrapDomReady() {
    document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();
