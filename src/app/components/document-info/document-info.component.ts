import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-document-info',
  templateUrl: './document-info.component.html',
  styleUrls: ['./document-info.component.scss']
})
export class DocumentInfoComponent implements OnInit {

  @Input() docInfo: {docName: string, userName: string} = {docName: '', userName: ''};


  @Output() goBackEvent = new EventEmitter<boolean>();
  @Output() sendData = new EventEmitter<{docName: string, userName: string}>(); 

  constructor() { }

  ngOnInit(): void {
  }

  back(): void {
    this.goBackEvent.emit(true);
  }

  handleForm(): void {
    this.sendData.emit({docName: this.docInfo.docName, userName: this.docInfo.userName});
  }

}
