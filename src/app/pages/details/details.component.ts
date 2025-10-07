import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, reduce, Subscription } from 'rxjs';
import { LineChartResult } from 'src/app/core/models/LineChartResult';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {
  titrePrincipale: string = 'country name'
  public olympics$: Observable<any> = of(null);
  //  public olympics$!: Observable<Olympic>;
  countryName!: string;
  // nombre de participations aux JO ;
  participationNbr!: number;
  // nombre total de médailles obtenues ;
  totalMedals!: number;
  // nombre total d'athlètes présentés aux JO.
  totalAthlets!: number;
  // resultat de graphique à envoyer
  lineChartResult!: LineChartResult[];

  subcription!: Subscription

  constructor(private olympicService: OlympicService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
  ngOnInit(): void {
    // Écouter les queryParams
    this.route.params.subscribe(params => {
      this.countryName = params['name'];
      console.log("paraaaaaaaaaaaaams ", params);
      //his.titrePrincipale= 'country name : '+this.countryId

    });
    // charger les donnée de pays selectionné 
    this.olympics$ = this.olympicService.getOlympics();
    this.subcription = this.olympics$.subscribe(data => {
      //console.log("Données reçues + country name  :", data, "countryname", this.countryName);
      const country = data.find((c: any) => c.country === this.countryName);//
      if (country) {
        console.log("country de detail :", country);
        this.titrePrincipale = country.country;
        this.totalAthlets = country.participations.reduce((sum: number, part: any) => sum + part.athleteCount, 0)   // totale des athletes par country                   // ou un autre champ si tu veux un nombre
        this.totalMedals = country.participations.reduce((sum: number, part: any) => sum + part.medalsCount, 0)   // totale des medaille par country                   // ou un autre champ si tu veux un nombre
        this.participationNbr = country.participations.length;

        console.log("le resultat de line chart avant ", this.lineChartResult);

        this.lineChartResult = [{
          name: "",
          series: country.participations.map((c: any) => ({
            name: c.year,
            value: c.medalsCount // somme des medaille par country // ou un autre champ si tu veux un nombre
          }))
          // somme des medaille par country                   // ou un autre champ si tu veux un nombre
        }]
        console.log("le resultat de line chart APRES ", this.lineChartResult);
      } else {
        this.router.navigate(['**']);
      }
    })

  }

}


