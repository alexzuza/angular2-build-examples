import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from './app.module.ngfactory';
import { enableProdMode } from '@angular/core';

console.log('Running in PROD mode');
enableProdMode();

console.log('Running AOT compiled');
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);