import { Component, OnInit } from '@angular/core';
import { Menu } from '../model/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu: Menu[];

  constructor() {}

  ngOnInit() {
    this.menu = [
      {
        texto: 'Tour of Heroes',
        url: 'https://angular.io/tutorial'
      },
      {
        texto: 'CLI Documentation',
        url: 'https://github.com/angular/angular-cli/wiki'
      },
      { texto: 'Angular blog', url: 'https://blog.angular.io/' }
    ];
  }
}
