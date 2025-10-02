import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValueChangeEvent } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { count, Observable, of, Subscription } from 'rxjs';
import { DataResult } from 'src/app/core/models/DataResult';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy{
  // observable qui envoie le fichier de assert
  public olympics$: Observable<any> = of(null);
  // number of JO ou nbr des années =3
  JoNembre: number = 0;
  // number of countries =6
  CountryNbr!: number;
  Countries!: Olympic;
  // le titre principale 
//  titrePrincipale: string = 'Medal per Country';
  //les donnée de pie chart :
  dataResult!: DataResult[];
  subcription!: Subscription
  constructor(private olympicService: OlympicService, private router: Router) {

  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
    
  }

  ngOnInit(): void {

    this.olympics$ = this.olympicService.getOlympics();
    this.subcription = this.olympics$.subscribe(data => {
      // MET tous les attribut year de intercface  participation dans la meme table puis enlever les doublant avec set et donne moi la size
      //flatmap pour mettre dans un seul tableau les année de la table participatoin
      this.JoNembre = new Set(data.flatMap((c: any) => c.participations.map((p: any) => p.year))).size;
      this.CountryNbr = data.length;
      //this.Countries = data;
      console.log("le contenu de data ", this.Countries)
      //this.Countries=data
      this.dataResult = data.map((p: any) => ({
        name:p.country,
        value:p.participations.reduce((sum: number, part: any) => sum + part.medalsCount, 0)   // somme des medaille par country                   // ou un autre champ si tu veux un nombre
      }));

      console.log("le resultat de pie chart ", this.dataResult);


    })

  }



  // charger le detail de country selected 

  chargerDetailDe(country: any): void {
    // Redirection vers la page détail
    this.router.navigate(['/details', country.name]);

  }

}
