import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {
  @Output() filterOutput = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onKeyup(event) {
    const cgFilter = { title: event.target.value }
    this.filterOutput.emit(cgFilter)
  }

}
