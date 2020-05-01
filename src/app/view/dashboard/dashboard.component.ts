import { Component, OnInit } from '@angular/core';
import { ToolbarService, LinkService, ImageService, ResizeService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';

import Speech from 'speak-tts';
import { ThemeService } from 'src/app/services/theme.service';

//  import { RxSpeechRecognitionService, resultList, } from '@kamiazya/ngx-speech-recognition';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
   providers: [ToolbarService, LinkService, ImageService, ResizeService, HtmlEditorService],
  // providers: [ RxSpeechRecognitionService ]
})
export class DashboardComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    
  }


  toggle() {
  //   const active = this.themeService.getActiveTheme() ;
  //   if (active.name === 'light') {
  //     this.themeService.setTheme('dark');
  //   } else {
  //     this.themeService.setTheme('light');
  //   }
   }

}
