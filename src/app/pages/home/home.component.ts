import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { DataResult } from 'src/app/core/models/DataResult';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  public olympics$: Observable<any> = of(null);
  JoNembre: number = 0;
  CountryNbr!: number;
  dataResult!: DataResult[];
  subcription!: Subscription;

  constructor(private olympicService: OlympicService, private router: Router) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.subcription = this.olympics$.subscribe(data => {
            this.JoNembre = new Set(data.flatMap((c: any) => c.participations.map((p: any) => p.year))).size;
            this.CountryNbr = data.length;
            this.dataResult = data.map((p: any) => ({
                name: p.country,
                value: p.participations.reduce((sum: number, part: any) => sum + part.medalsCount, 0)  
              }));
    });

  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();

  }

  chargerDetailDe(country: any): void {
    this.router.navigate(['/details', country.name]);
    }

}
