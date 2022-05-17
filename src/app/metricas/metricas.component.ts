import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { MetricasService } from '../servicios/metricas.service';
declare var jQuery: any;
@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.css']
})

export class MetricasComponent implements OnInit {


  gradient: boolean = true;
  id: any;
  opSelec: any = 0;
  // options
  view: [number,number];// [view]="view"
  viewPie: [number,number];// [view]="view"
  //legend: boolean = true; [legend]="legend"
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;

  timeline: boolean = false;
  roundDomains: boolean = true;
  myOpt: Object = {
  
  }
  colors = [
    { name: "Calificaciones promedio", value: '#197278' },
    { name: "Interacciones Graf", value: '#197278' },
    { name: "get Sales", value: '#197278' },
    { name: "5 estrellas", value: '#a3c7c9'},
    { name: "4 estrellas", value: '#5e9ca1'},
    { name: "3 estrellas", value: '#197278'},
    { name: "2 estrellas", value: '#0f4448'},
    { name: "1 estrellas", value: '#000000'}
  ]
  myOptDecimal: Object = {
    decimal: ".",
    decimalPlaces: 1,
  }
  constructor(private route:ActivatedRoute, private metricasService : MetricasService,) {   
    this.view = [(innerWidth*0.63), 500];
    this.viewPie = [(innerWidth*0.63), 300];
  }

  get multi () {
    return this.metricasService.getData();
  }
  get xAxisLabel(){
    return this.metricasService.getXAxisLabel();
  }
  get yAxisLabel(){
    return this.metricasService.getYAxisLabel();
  }
  get single (){
    return this.metricasService.getSingle();
  }
  get comments (){
    return this.metricasService.getComments();
  }

  get nClientes(){
    return this.metricasService.getnClientes();
  }
  get nProductos(){
    return this.metricasService.getnProductos();
  }
  get nListas(){
    return this.metricasService.getnListas();
  }
  get interacciones(){
    return this.metricasService.getInteracciones();
  }

get calif (){
  return this.metricasService.getCalif();
}
get ventasT(){
  return this.metricasService.getVentasT();
}
get ventasH(){
  return this.metricasService.getVentasH();
}

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
      document.body.classList.remove('nb-theme-default');
    //Jquery
      if(localStorage.getItem('token') !== null){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        jQuery(".mainMenu").hide();
        jQuery(".botMenu").css("display","flex"); 
      }
      if(localStorage.getItem('idBot') === null){
        jQuery('.botBtn').prop('disabled', true);
      }
  }
  onResizePie(event: any) {
    if(event.target.innerWidth < 992){
      this.viewPie = [(innerWidth), 300];
    }
    else{
      this.viewPie = [(event.target.innerWidth*0.63), 300];
    }
  }
  onResize(event: any) {
    if(event.target.innerWidth < 992){
      this.view = [(innerWidth), 500];
    }
    else{
      this.view = [(event.target.innerWidth*0.63), 500];
    }
  }
  cambiarGraf(){
    this.metricasService.cambiarGraf(this.opSelec);
  }

  setNClientes(){

  }

}
