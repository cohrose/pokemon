import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() name: string;
  @Input() sprite: string;
  @Input() isType: boolean;
  @Output() isBlank: EventEmitter<boolean> = new EventEmitter<boolean>();
  error: boolean;

  constructor() {}

  ngOnInit(): void {}

  notFound() {
    this.error = true;
    this.isBlank.emit(true);
  }
}
