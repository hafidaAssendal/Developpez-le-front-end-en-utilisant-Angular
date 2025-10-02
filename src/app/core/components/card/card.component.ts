import { Component, Input, OnInit } from '@angular/core';
import { OlympicService } from '../../services/olympic.service';
import { Olympic } from '../../models/Olympic';
import { count, filter, map } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent{
@Input() title:string="title card";
@Input() value : number=10;

}
