import {AfterViewInit, Component, OnInit} from '@angular/core';
import $ from 'jquery';
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    /** Make transparent or not when scroll **/
    $(document).ready(function () {
      $(window).scroll(function() {
        if($(document).scrollTop()>50){
          $("nav").addClass("shrink")
        } else {
          $("nav").removeClass("shrink")
        }
      });

      /** Close the navbar when click outside **/
      $(document).click(function (event) {
        var click = $(event.target);
        var _open = $(".navbar-collapse").hasClass("show");
        if (_open === true && !click.hasClass("navbar-toggler")) {
          $(".navbar-toggler").click();
        }
      });
    });
  }

  navegar() {
   this.router.navigate(['/']);
  }
}
