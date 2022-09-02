import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Dynamsoft from 'dwt';
import { WebTwain } from 'dwt/dist/types/WebTwain';

type dataT = {
  docName: string,
  userName: string,
  ipAddress: string,
  userAgent: string,
  file: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  DWObject!: WebTwain;
  docInfo: {docName: string, userName: string} = {
    docName: '', 
    userName: ''
  }

  showDocumentInfo: boolean = false;

  constructor(
    private http: HttpClient
  ) {}

  showBaseForm(): void {
    this.showDocumentInfo = false;
  }

  openDocumentInfo() {
    
    if(!this.DWObject.HowManyImagesInBuffer) {
      alert('First, select at least one image');
      return;
    }

    this.showDocumentInfo = true;
  }

  webTwainObjectInit($event: WebTwain) {
    this.DWObject = $event;
  }

  async handleData($event: { docName: string, userName: string }) {
    
    /* get ip adress */
    let ipResult = <{ip: string}> await this.getIPAddress();
    
    /* fill data object */
    let data: dataT = {ipAddress: ipResult.ip, userAgent: navigator.userAgent, docName: $event.docName, userName: $event.userName, file: ''}

    /* count current images */
    let indices: number[] = [];
    const imagesCount: number = this.DWObject.HowManyImagesInBuffer;
    if(!imagesCount) {alert('No images added')};

    for(let count=0; count<imagesCount; count++) {
      indices.push(count)
    } 

    /* convert images to file and than send to server */
    this.DWObject.ConvertToBase64(indices, Dynamsoft.DWT.EnumDWT_ImageType.IT_PDF, (res, indices, type)=>{
      const fileInBase64 = res.getData(0, res.getLength());
      data.file = fileInBase64;
      this.sendRequest(data)

    }, ((errorCode, errorString)=>{
      alert(errorString)
    }));
  }

  async getIPAddress() {
    return await this.http.get("https://api.ipify.org/?format=json").toPromise()
  }

  async sendRequest(data: dataT) {
    /* await this.http.post('', data).toPromise(); */
    this.DWObject.RemoveAllImages();
    this.docInfo.docName = '';
    this.docInfo.userName = '';
    console.log(data)
    this.showDocumentInfo = false;
    alert('Data sent successfully ✅');
  }

}
