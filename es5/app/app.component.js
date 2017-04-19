(function (app) {
    var Component = ng.core.Component;

    app.AppComponent = Component({
            selector: 'my-app',
            template:
                '<h1>Hello world {{ counter }}</h1>' +
                '<button (click)="increment()">+</button>'
        })
        .Class({
            constructor: function () {
                this.counter = 1;
            },
            increment: function () {
                this.counter++;
            }
        });

})(window.app || (window.app = {}));