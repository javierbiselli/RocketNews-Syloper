import { Component, OnInit } from "@angular/core";
import Typed from "typed.js";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  currentDate: string = "";
  closeIcon: string = "fa-xmark";

  ngOnInit() {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const updateDateTime = () => {
      this.currentDate = new Date().toLocaleDateString("en-US", options);
    };

    updateDateTime();

    setInterval(updateDateTime, 1000);
  }

  menuButtonClicked: boolean = false;
  menuButtonClass: string = "fa-bars";

  changeMenuVisibility(): void {
    this.menuButtonClicked = !this.menuButtonClicked;
    this.menuButtonClicked
      ? (this.menuButtonClass = this.closeIcon)
      : (this.menuButtonClass = "fa-bars");
  }

  searchButtonClicked: boolean = false;
  searchButtonClass: string = "fa-magnifying-glass";

  changeSearchVisibility(): void {
    this.searchButtonClicked = !this.searchButtonClicked;
    this.searchButtonClicked
      ? (this.searchButtonClass = this.closeIcon)
      : (this.searchButtonClass = "fa-magnifying-glass");
  }

  ngAfterViewInit() {
    const options = {
      strings: [
        "Probando un texto corto",
        "Probando un texto largo muy largo para ver si esto funciona y no se pasa el texto de su contenedor",
      ],
      typeSpeed: 50,
      backSpeed: 20,
      backDelay: 2500,
      loop: true,
    };

    const typed = new Typed(".trendig-new-text", options);
  }
}
