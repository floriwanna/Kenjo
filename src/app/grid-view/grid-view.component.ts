import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  gridView = false;
  @Input() elements: [];
  @Output() showMore: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();


  onShowMore(element) {
    this.showMore.emit([element]);
  }
  onRemove(element) {
    this.remove.emit([element]);
  }

  changeView() {
    this.gridView = !this.gridView;
  }
}
