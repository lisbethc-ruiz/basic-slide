import { Component, OnInit, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { FileManagementService } from '../services/file-management.service';
import * as remark from 'remark';
import * as html from 'remark-html';

@Component({
  selector: 'app-slide-view',
  templateUrl: './slide-view.component.html',
  styleUrls: ['./slide-view.component.scss']
})
export class SlideViewComponent implements OnInit {
  sections: {
    visible: boolean,
    content: string
  }[];

  constructor(private filemgmt: FileManagementService, private ref: ChangeDetectorRef) { }

  ngOnInit()
  {
    this.loadFile();
  }

  loadFile() {
    this.filemgmt.getFile('Test1.md').subscribe(data => {
      const info = remark()
                  .use(html)
                  .processSync(data).toString();

      this.sections = info.split('<hr>').map((v, i) => {
        return { visible: i === 0, content: v };
      });
    });
  }

  @HostListener('window:keydown.arrowup', ['$event'])
  goUp(event) {
    if (this.sections) {
      const selected = this.sections.findIndex(x => x.visible === true);
      if (selected > 0) {
        this.sections[selected].visible = false;
        this.sections[selected - 1].visible = true;
      }
    }

    event.stopPropagation();
  }

  @HostListener('window:keydown.arrowdown', ['$event'])
  goDown(event) {
    if (this.sections) {
      const selected = this.sections.findIndex(x => x.visible === true);
      if (selected < (this.sections.length - 1)) {
        this.sections[selected].visible = false;
        this.sections[selected + 1].visible = true;
      }
    }

    event.stopPropagation();
  }

  @HostListener('mousewheel', ['$event'])
  @HostListener('DOMMouseScroll', ['$event'])
  @HostListener('onmousewheel', ['$event'])
  MouseWheel(event) {
    const isUp = event.wheelDelta && event.wheelDelta > 0;
    if (isUp) {
      this.goUp(event);
    } else {
      this.goDown(event);
    }
    
    event.stopPropagation();
  }
}
