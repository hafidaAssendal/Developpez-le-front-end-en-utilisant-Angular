import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { DataResult } from 'src/app/core/models/DataResult';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  public olympics$: Observable<Olympic[] | null> = of(null);
  jONumbre: number = 0;
  countryNumbre!: number;
  dataResult!: DataResult[];
  subscription!: Subscription;

  constructor(private olympicService: OlympicService, private router: Router) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.subscription = this.olympics$.subscribe(data => {
      if (!data) return ;
      this.countryNumbre = data.length;
      this.jONumbre = new Set(data.flatMap((c: Olympic) => c.participations.map((p: Participation) => p.year))).size;
      this.dataResult = data.map((p: Olympic) => ({
        name: p.country,
        value: p.participations.reduce((sum: number, part: Participation) => sum + part.medalsCount, 0)
      }));
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

  loadCountryDetails(country: DataResult): void {
    this.router.navigate(['/details', country.name]);
  }

}
