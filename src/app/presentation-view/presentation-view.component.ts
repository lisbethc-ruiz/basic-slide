import { Component, OnInit, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { PresentationService } from '../services/presentation.service';
import * as remark from 'remark';
import * as html from 'remark-html';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-presentation-view',
  templateUrl: './presentation-view.component.html',
  styleUrls: ['./presentation-view.component.scss']
})
export class PresentationViewComponent implements OnInit {
  sections: {
    visible: boolean,
    content: string
  }[];
  sub: any;
  name: string;

  constructor(
    private router: Router,    
    private activatedRoute: ActivatedRoute,
    private presentationService: PresentationService) { }

  ngOnInit()
  {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.name = params['name'];
      this.loadFile();
   });
   
  }

  ngOnDestroy(): void {
    if(this.sub)
    {
      this.sub.unsubscribe();
    }
   }
 
   listPresentations()
   {
     this.router.navigate(
       ['/'],
       {
          relativeTo: this.activatedRoute
       });
   }
  
  loadFile() {
    this.presentationService.getPresentation(this.name).then(data => {
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
  mouseWheel(event) {
    const isUp = event.wheelDelta && event.wheelDelta > 0;
    if (isUp) {
      this.goUp(event);
    } else {
      this.goDown(event);
    }
    
    event.stopPropagation();
  }
}
