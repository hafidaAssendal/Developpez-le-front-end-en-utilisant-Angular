import { Component, Input } from '@angular/core';
import { LineChartResult } from '../../models/LineChartResult';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrl: './chart-line.component.scss'
})
export class ChartLineComponent {
@Input() resultData!: LineChartResult[]
  view: [number, number] = [550, 300]; 
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
