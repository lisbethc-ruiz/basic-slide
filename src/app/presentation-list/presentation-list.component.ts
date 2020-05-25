import { Component, OnInit } from '@angular/core';
import { PresentationService } from '../services/presentation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-presentation-list',
  templateUrl: './presentation-list.component.html',
  styleUrls: ['./presentation-list.component.scss']
})
export class PresentationListComponent implements OnInit {

  presentations: any [];

  constructor(
    private router: Router,    
    private activatedRoute: ActivatedRoute,
    private presentationService: PresentationService) { }

  ngOnInit() 
  {
   this.loadSlides();
  }

  loadSlides()
  {
    this.presentationService.getPresentations().then(data => 
      {
        this.presentations = data;
      });
  }

  view(item)
  {
    this.router.navigate(
      ['/view', item.name],
      {
         relativeTo: this.activatedRoute
      });
  }

  edit(item)
  {
    this.router.navigate(
      ['/edit', item.name],
      {
         relativeTo: this.activatedRoute
      });
  }

  new()
  {
    this.router.navigate(
      ['/new'],
      {
         relativeTo: this.activatedRoute
      });
  }
}
