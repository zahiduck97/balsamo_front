import {AfterViewInit, Component, OnInit} from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'ngx-app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    $(document).ready(function () {
      $(window).scroll(function() {
        if($(document).scrollTop()>50){
          $("nav").addClass("shrink")
        } else {
          $("nav").removeClass("shrink")
        }
      });
    });
  }


}
