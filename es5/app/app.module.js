(function (app) {
    var NgModule = ng.core.NgModule;
    var BrowserModule = ng.platformBrowser.BrowserModule;
    var AppComponent = app.AppComponent;


    app.AppModule = NgModule({
            imports: [BrowserModule],
            declarations: [AppComponent],
            providers: [],
            bootstrap: [AppComponent]
        })
        .Class({
            constructor: [function () {
            }]
        });
})(window.app || (window.app = {}));