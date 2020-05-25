import { Component, OnInit, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { PresentationService } from '../services/presentation.service';
import * as remark from 'remark';
import * as html from 'remark-html';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-presentation-edit',
  templateUrl: './presentation-edit.component.html',
  styleUrls: ['./presentation-edit.component.scss']
})
export class PresentationEditComponent implements OnInit {
  sections: {
    visible: boolean,
    content: string
  }[];
  sub: any;
  name: string;
  new: boolean;

  constructor(
    private router: Router,    
    private activatedRoute: ActivatedRoute,
    private presentationService: PresentationService) { }

  ngOnInit()
  {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.name = params['name'];
      this.loadPresentation();
   });
   
  }

  ngOnDestroy(): void {
    if(this.sub)
    {
      this.sub.unsubscribe();
    }
   } 
  
  loadPresentation() {
    if (this.name)
    {
      this.new = false;
      this.presentationService.getPresentation(this.name).then(data => {
        const info = data; /* remark()
                    .use(html)
                    .processSync(data).toString();
  */
        this.sections = info.split('---').map((v, i) => {
          return { visible: i === 0, content: v };
        });
      });
    }
    else {
      this.sections = [{ visible : true, content: ''}];
      this.new = true;
    }
  }

  addSlide()
  { 
    if (this.sections) 
    {
      const selected = this.sections.findIndex(x => x.visible === true);
      if (selected >= 0)
      {
        this.sections[selected].visible = false;
        this.sections.splice(selected + 1, 0, { visible : true, content: ''})
      }
    }
  }

  deleteSlide()
  {
    if (this.sections) 
    {
      const selected = this.sections.findIndex(x => x.visible === true);
      if (selected >= 0)
      {
        this.sections[selected].visible = false;
        this.sections.splice(selected, 1);

        if (this.sections.length > 0)
        {
          if (selected < this.sections.length)
          {
            this.sections[selected].visible = true;
          }
          else
          {
            this.sections[selected - 1].visible = true;
          }
        }
        else{
          this.sections.push({ visible : true, content: ''})
        }
      }
    }
  }

  savePresentation()
  {
    if (this.name)
    {
      var newData = this.sections.map(x => x.content).join("\n---\n");
      this.presentationService.savePresentation({name: this.name, content: newData});
    }
 }

  cancelChanges()
  {
    this.loadPresentation();
  }

  viewPresentation()
  {
    this.router.navigate(
      ['/view', this.name],
      {
         relativeTo: this.activatedRoute
      });
  }

  listPresentations()
  {
    this.router.navigate(
      ['/'],
      {
         relativeTo: this.activatedRoute
      });
  }

  goUp(event) {
    if (this.sections) {
      const selected = this.sections.findIndex(x => x.visible === true);
      if (selected > 0) {
        this.sections[selected].visible = false;
        this.sections[selected - 1].visible = true;
      }
    }

    if(event)
    {
      event.stopPropagation();
    }
  }

  goDown(event) {
    if (this.sections) {
      const selected = this.sections.findIndex(x => x.visible === true);
      if (selected < (this.sections.length - 1)) {
        this.sections[selected].visible = false;
        this.sections[selected + 1].visible = true;
      }
    }

    if(event)
    {
      event.stopPropagation();
    }
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
    
    if(event)
    {
      event.stopPropagation();
    }
  }
}
