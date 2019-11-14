import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pregunta-business',
  templateUrl: './pregunta-business.component.html',
  styleUrls: ['./pregunta-business.component.css']
})
export class PreguntaBusinessComponent implements OnInit {
  @Input() Data = [];
  @Input() Labels = [];
  @Input() barChartOptions = {};

  public barChartLegend = false;

  public barChartType = 'bar';
  public barChartColors = [
    {
      backgroundColor: 'rgba(114,37,42,0.7)',
      hoverBackgroundColor: 'rgba(114,37,42,0.9)',
      borderColor: 'rgba(114,37,42,0.7)',
      hoverBorderColor: 'rgba(114,37,42,0.7)'
    }
  ];

  public doughnutChartType = 'doughnut';
  public pieChartType = 'pie';

  public dashboards = ['Doughnut', 'Pie', 'Bar'];

  public grafico = 'Bar';

  constructor() { }

  ngOnInit() { }

  dashboard(e) {
    this.grafico = e.target.value;
  }

}

