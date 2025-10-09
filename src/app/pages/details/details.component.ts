import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, reduce, Subscription } from 'rxjs';
import { DataResult } from 'src/app/core/models/DataResult';
import { LineChartResult } from 'src/app/core/models/LineChartResult';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {
 
  public olympics$: Observable<Olympic[]|null> = of(null);
  title!: string;
  countryName!: string;
  participationNumber!: number;
  totalMedals!: number;
  totalAthletes!: number;
  lineChartResult!: LineChartResult[];
  subscription!: Subscription

  constructor(private olympicService: OlympicService, private route: ActivatedRoute, private router: Router) {}
 
  ngOnInit(): void {
      this.route.params.subscribe(params => { this.countryName = params['name']});
      this.olympics$ = this.olympicService.getOlympics();
      this.subscription = this.olympics$.subscribe(data => {
          if(!data) return;
          const country = data.find((c: Olympic) => c.country === this.countryName);
          if (country) {
              this.title = country.country;
              this.totalAthletes = country.participations.reduce((sum: number, part: Participation) => sum + part.athleteCount, 0);  
              this.totalMedals = country.participations.reduce((sum: number, part: Participation) => sum + part.medalsCount, 0);   
              this.participationNumber = country.participations.length;
              this.lineChartResult = [{
                                        name: "",
                                        series: country.participations.map((c: Participation) => ({
                                                                                            name: c.year.toString(),
                                                                                            value: c.medalsCount 
                                                                                          }))
                                       
                                      }]
       
          } else {
              this.router.navigate(['**']);
            }
       });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}


