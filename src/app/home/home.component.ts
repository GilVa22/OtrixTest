import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  ngOnInit(): void {
    document.body.classList.remove('nb-theme-default');
  }

}
