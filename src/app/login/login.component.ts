import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { Router } from '@angular/router';
import axios from 'axios';
declare var jQuery: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
password="";
user="";
hide = true;
  constructor(private service : AppServiceService, private router: Router, private appService: AppServiceService) { }

  

  ngOnInit(): void {
    //this.getDataFromAPI();
    document.body.classList.remove('nb-theme-default');
    localStorage.removeItem('token');
    jQuery(".botMenu").css("display","none");
    jQuery(".mainMenu").css("display","flex"); 
  }
  setUsuario(user: any){
    this.user=user.value;
  }
  setPassword(password: any){
    this.password=password.value;
  }
  async handleSubmit(): Promise<any>{
    let json = {
      "email": this.user,
      "password": this.password,
    }
      var apiUrl = '/user/login';
      axios.post(apiUrl, json).then((response) =>{
        //jQuery(".mainMenu").hide();
        jQuery(".mainMenu").css("display","none");
        jQuery(".botMenu").css("display","flex"); 
        console.warn(response);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        localStorage.setItem('token', response.data.token);
        //window.location.href = '/lista-bot';
        //this.router.navigate(['/lista-bot']);
        this.router.navigateByUrl('/lista-bot');
        return response;
      }).catch((error)=>{
        jQuery(".error").empty();
        jQuery(".error").append(error.response.data.error);
        jQuery(".error").fadeIn().delay(3200).fadeOut(300);
        return error;
      });

  }

}
