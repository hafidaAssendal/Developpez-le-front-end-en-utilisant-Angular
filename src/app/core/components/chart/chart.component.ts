import { Component, EventEmitter, HostListener, input, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DataResult } from '../../models/DataResult';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  @Input() result!: DataResult[];
  @Output() countrySelected = new EventEmitter<DataResult>(); // envoie de nom de pays selectionné avec enventEmitter 

  // options
  view = [700, 400];

  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  // Variables pour le tooltip personnalisé
  tooltipVisible: boolean = false;
  tooltipX: number = 0;
  tooltipY: number = 0;
  tooltipData: any = null;
  // Schéma de couleurs
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#E44D25']
  };

  // la selection d'un pays 

  onSelect(data: DataResult): void {
    const selectedItem = this.result.find((item: DataResult) => item.name === data.name);
    if (selectedItem) {
      this.countrySelected.emit(selectedItem);
    }
    //  this.CountrySelected = data; renvoie que name et value 

    console.log("country sélectionné :", this.countrySelected);
  }
  // 
  


}



