(function(app) {
    var platformBrowserDynamic = ng.platformBrowserDynamic.platformBrowserDynamic;
    var AppModule = app.AppModule;

    platformBrowserDynamic().bootstrapModule(AppModule);

})(window.app || (window.app = {}));
