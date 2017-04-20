import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'child',
    templateUrl: './child.component.html'
})
export class ChildComponent implements OnInit {
    items = [1,2,3,4,5];

    ngOnInit() { }

}