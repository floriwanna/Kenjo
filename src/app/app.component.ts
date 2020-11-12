import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'appDisc';


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
      , map(() => this.activatedRoute)
      , map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      , filter((route) => route.outlet === 'primary')
      , mergeMap((route) => route.data)
    )
      .subscribe((event) => { this.titleService.setTitle(event['title']); });
  }

  getTitle() { return this.titleService.getTitle(); }
}
