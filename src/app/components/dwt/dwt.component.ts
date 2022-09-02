import { HttpClient } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import Dynamsoft from 'dwt';
import { DocumentConfiguration } from 'dwt/dist/types/Addon.Camera';
import { WebTwain } from 'dwt/dist/types/WebTwain';
import { ThumbnailViewerSettings } from 'dwt/dist/types/WebTwain.Viewer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dwt',
  templateUrl: './dwt.component.html',
  styleUrls: ['./dwt.component.scss']
})
export class DwtComponent implements OnInit {

  DWObject!: WebTwain;
  selectSources!: HTMLSelectElement;
  containerId = 'dwtcontrolContainer';
  showVideoConfigs = {
    scannerViewer: {
      autoDetect: {
        enableAutoDetect: true
      },
      filterViewer: {
        exitDocumentScanAfterSave: true
      }
    }
  };
  @Output() dwObjectInstance = new EventEmitter<WebTwain>();

  constructor(
  ) {
  }

  ngOnInit(): void {
    Dynamsoft.DWT.Containers = [{
      WebTwainId: 'dwtObject',
      ContainerId: this.containerId,
      Width: '100%',
      Height: '210px'
    }];
    Dynamsoft.DWT.UseLocalService = false;
    Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => {
      this.Dynamsoft_OnReady();
    });

    Dynamsoft.DWT.ResourcesPath = 'assets/dwt/Resources';
    Dynamsoft.DWT.ProductKey = environment.DWT_PRODUCT_KEY;
    Dynamsoft.DWT.Load()

  }

  Dynamsoft_OnReady(): void {
    this.DWObject = Dynamsoft.DWT.GetWebTwain('dwtcontrolContainer');

    this.dwObjectInstance.emit(this.DWObject);

    this.DWObject.MaxImagesInBuffer = 100;
    this.DWObject.Viewer.background = 'white';
    this.DWObject.Viewer.border = 'none';

    // Customize the thumbnail viewer
    let thumbnailViewerSettings: ThumbnailViewerSettings = {
      location: "left",
      size: "30%",
      columns: 1,
      rows: 3,
      scrollDirection: "vertical", // 'horizontal'
      pageMargin: 10,
      background: "white",
      border: "",
      allowKeyboardControl: true,
      allowPageDragging: true,
      allowResizing: true,
      showPageNumber: true,
      pageBackground: "white",
      pageBorder: "1px solid rgb(238, 238, 238)",
      hoverPageBorder: "1px solid rgb(238, 238, 238)",
      placeholderBackground: "rgb(251, 236, 136)",
      selectedPageBorder: "1px solid rgb(125,162,206)",
      selectedPageBackground: "rgb(199, 222, 252)",
    };

    let objThumbnailViewer = this.DWObject.Viewer.createThumbnailViewer(thumbnailViewerSettings);
    objThumbnailViewer.show();
  }

  captureImage(): void {
    if (this.DWObject) {
      this.DWObject.Addon.Camera.scanDocument(this.showVideoConfigs)
        .catch((err) => {
          alert(err);
        })
    }
  }

  selectImage(): void {
    this.DWObject.IfShowFileDialog = true;
    this.DWObject.LoadImageEx("", Dynamsoft.DWT.EnumDWT_ImageType.IT_ALL);
  }

}
