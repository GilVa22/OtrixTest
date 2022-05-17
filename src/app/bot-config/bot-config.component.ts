import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { botConfigService } from '../servicios/bot-config.service';
declare var jQuery: any;

@Component({
  selector: 'app-bot-config',
  templateUrl: './bot-config.component.html',
  styleUrls: ['./bot-config.component.css']
})
export class BotConfigComponent implements OnInit {
 idBot: any;
get userData (){
  return this.configService.getUserData();
}


  setName(name: any) {
    this.configService.setName(name);
  }
  setDesc(desc: any) {
   this.configService.setDesc(desc);
  }
  setURLKEY(urlKey: any) {
    this.configService.setURLKEY(urlKey);
  }
  setLoc1(dir1: any) {
   this.configService.setLoc1(dir1);
  }
  setLoc2(dir2: any) {
    this.configService.setLoc2(dir2);
  }
  constructor(private configService: botConfigService) { }

  ngOnInit(): void {
    this.idBot = localStorage.getItem('idBot');
    document.body.classList.remove('nb-theme-default');
    if (localStorage.getItem('token') !== null) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${localStorage.getItem('token')}`;
      jQuery('.mainMenu').hide();
      jQuery('.botMenu').css('display', 'flex');
    }
    if (localStorage.getItem('idBot') === null) {
      jQuery('.botBtn').prop('disabled', true);
    }
  }

  setConfig() {
    this.configService.setConfig();
  }


  
  
}
