import { Component, Input } from '@angular/core';

@Component({
    selector: 'custom-comp',
    templateUrl: './custom.component.html'
})
export class CustomComponent {
    @Input() foo: string;

}