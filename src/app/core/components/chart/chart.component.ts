import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataResult } from '../../models/DataResult';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  @Input() result!: DataResult[];
  @Output() countrySelected = new EventEmitter<DataResult>(); 

  view = [700, 400];
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  
  onSelect(data: DataResult): void {
    const selectedItem = this.result.find((item: DataResult) => item.name === data.name);
    if (selectedItem) {
      this.countrySelected.emit(selectedItem);
    }
    }
 }



