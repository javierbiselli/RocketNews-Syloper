import { Component, HostListener, OnInit } from "@angular/core";
import { Post } from "@shared/models";
import { DataHandlingService } from "src/app/services/data-handling.service";
import Typed from "typed.js";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private dataHandlingService: DataHandlingService) {}

  posts: Post[] = [];

  currentDate: string = "";
  closeIcon: string = "fa-xmark";

  // nav bar logic

  selectedTab: string = "";

  setSelectedTab(tab: string) {
    this.selectedTab = tab;
  }

  trendings: string[] = [];

  ngOnInit() {
    this.setSelectedTab(window.location.pathname);
    this.posts = this.dataHandlingService.posts.getValue();
    this.trendings = this.getTrending();

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
  abortController = new AbortController();

  changeMenuVisibility(): void {
    this.menuButtonClicked = !this.menuButtonClicked;

    if (this.menuButtonClicked) {
      this.menuButtonClass = this.closeIcon;

      let thisFile = this; // to avoid "this" refering to 'document'
      document.addEventListener("click", function (e) {
        // if user clicks outside menu:
        if (
          e.target != document.getElementById("nav") &&
          e.target != document.getElementById("menu-button") &&
          e.target != document.getElementById("menu-button-icon")
        ) {
          thisFile.menuButtonClass = "fa-bars";
          thisFile.menuButtonClicked = false;
          thisFile.abortController.abort(); // removes event listener
        }
      });
    } else {
      this.menuButtonClass = "fa-bars";
    }
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

  getTrending(): string[] {
    const filteredPosts = this.posts.filter((post) => post.priority === true);
    return filteredPosts.map((post) => post.title);
  }

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
      strings: [this.trendings[this.currentStringIndex]],
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
    if (this.currentStringIndex < this.trendings.length - 1) {
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
      (this.currentStringIndex + offset) % this.trendings.length;
    this.initializeTyped();
    this.startAutoChange();
  }
}
