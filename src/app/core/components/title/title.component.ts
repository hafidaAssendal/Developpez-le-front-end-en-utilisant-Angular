import { Component, Injectable, Input, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})

export class TitleComponent implements OnInit {
  @Input() PrincipalTitre:string='Medal per Country';
  titre!: string;
 
  constructor(private router: Router) { }

  ngOnInit(): void {

    // on écoute les changements de route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
         console.log(" route actuel :"+ event.url);
         this.modifierTitre(event.url);
      });

    // Définir le titre initial
 
    this.modifierTitre(this.router.url);
  }

  private modifierTitre(url: string) {
    if (url === '/home' || url === '/') {
      this.titre = 'Medal per Country';
      console.log("function " + this.titre);
    } else if (url === '/details') {
      this.titre = 'Country Name';
      console.log("function" + this.titre);
    }


  }

}
