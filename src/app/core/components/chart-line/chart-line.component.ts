import { Component, Input, input } from '@angular/core';
import { LineChartResult } from '../../models/LineChartResult';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrl: './chart-line.component.scss'
})
export class ChartLineComponent {

// charger les données de linecharts
@Input() resultData!: LineChartResult[]

  view: [number, number] = [600, 300]; // taille du graphique

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Dates';
  showYAxisLabel = true;
  yAxisLabel = 'Total Medals';
  autoScale = true;

}
