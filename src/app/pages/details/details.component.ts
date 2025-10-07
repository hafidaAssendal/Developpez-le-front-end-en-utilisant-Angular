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
 
  public olympics$: Observable<any> = of(null);
  titrePrincipale!: string;
  countryName!: string;
  participationNbr!: number;
  totalMedals!: number;
  totalAthlets!: number;
  lineChartResult!: LineChartResult[];
  subcription!: Subscription

  constructor(private olympicService: OlympicService, private route: ActivatedRoute, private router: Router) {}
 
  ngOnInit(): void {
      this.route.params.subscribe(params => { this.countryName = params['name']});
      this.olympics$ = this.olympicService.getOlympics();
      this.subcription = this.olympics$.subscribe(data => {
          const country = data.find((c: any) => c.country === this.countryName);
          if (country) {
              this.titrePrincipale = country.country;
              this.totalAthlets = country.participations.reduce((sum: number, part: any) => sum + part.athleteCount, 0);  
              this.totalMedals = country.participations.reduce((sum: number, part: any) => sum + part.medalsCount, 0);   
              this.participationNbr = country.participations.length;
              this.lineChartResult = [{
                                        name: "",
                                        series: country.participations.map((c: any) => ({
                                                                                            name: c.year,
                                                                                            value: c.medalsCount 
                                                                                          }))
                                       
                                      }]
       
          } else {
              this.router.navigate(['**']);
            }
       });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

}


