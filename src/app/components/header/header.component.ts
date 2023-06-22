import { Component, HostListener, OnInit } from "@angular/core";
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
    // clock logic
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

  // menu logic
  menuButtonClicked: boolean = false;
  menuButtonClass: string = "fa-bars";

  changeMenuVisibility(): void {
    this.menuButtonClicked = !this.menuButtonClicked;
    this.menuButtonClicked
      ? (this.menuButtonClass = this.closeIcon)
      : (this.menuButtonClass = "fa-bars");
  }

  // search bar logic
  searchButtonClicked: boolean = false;
  searchButtonClass: string = "fa-magnifying-glass";

  @HostListener("window:resize")
  onWindowResize() {
    if (window.innerWidth < 992) {
      this.searchButtonClicked = false;
      this.searchButtonClass = "fa-magnifying-glass";
    }
  }

  changeSearchVisibility(): void {
    this.searchButtonClicked = !this.searchButtonClicked;
    this.searchButtonClicked
      ? (this.searchButtonClass = this.closeIcon)
      : (this.searchButtonClass = "fa-magnifying-glass");
  }

  //--------------- TYPED.JS ---------------

  // getTrending() {
  //   let trending = [];
  //   for (let i = 0; i < 3; i++) {
  //     trending.push(this.newsData[i].title);
  //   }
  //   console.log(trending);
  //   return trending;
  // }

  // trending = this.getTrending();

  strings: string[] = [
    "Probando un texto corto",
    "Probando un texto largo muy largo para ver si esto funciona y no se pasa el texto de su contenedor",
    "Otro texto de longitud media para probar cómo funciona",
  ];
  currentStringIndex: number = 0;
  typed: Typed | undefined;
  autoChangeInterval: any | undefined;

  ngAfterViewInit() {
    this.initializeTyped();
    this.startAutoChange();
  }

  // typed.js configuration
  initializeTyped() {
    const options = {
      strings: [this.strings[this.currentStringIndex]],
      typeSpeed: 20,
      backDelay: 10000,
      loop: true,
    };

    this.typed = new Typed(".trending-new-text", options);
  }

  // functions for navigating between trending news
  startAutoChange() {
    this.autoChangeInterval = setInterval(() => {
      this.changeTrendingNew(1);
    }, 6000);
  }

  stopAutoChange() {
    if (this.autoChangeInterval) {
      clearInterval(this.autoChangeInterval);
    }
  }

  incrementStringIndex() {
    if (this.currentStringIndex < this.strings.length - 1) {
      this.changeTrendingNew(1);
    }
  }

  decrementStringIndex() {
    if (this.currentStringIndex > 0) {
      this.changeTrendingNew(-1);
    }
  }

  changeTrendingNew(offset: number) {
    this.stopAutoChange();

    if (this.typed) {
      this.typed.destroy();
    }

    this.currentStringIndex =
      (this.currentStringIndex + offset) % this.strings.length;
    this.initializeTyped();
    this.startAutoChange();
  }
}
