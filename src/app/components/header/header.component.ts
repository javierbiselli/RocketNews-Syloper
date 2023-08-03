import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Post, Result } from "@shared/models";
import { ApiCallService } from "@shared/services";
import { Subscription } from "rxjs";
import { DataHandlingService } from "src/app/services/data-handling.service";
import { SearchResultService } from "src/app/services/search-result.service";
import Typed from "typed.js";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @ViewChild("searchInput", { static: false }) searchInput!: ElementRef;

  constructor(
    private dataHandlingService: DataHandlingService,
    private apiCallService: ApiCallService,
    private SearchResultService: SearchResultService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.handleLocationChange();
      }
    });
  }

  posts: Post[] = [];

  currentDate: string = "";
  closeIcon: string = "fa-xmark";

  // nav bar logic

  selectedTab: string = "";

  setSelectedTab(tab: string) {
    this.selectedTab = tab;
  }

  trendings: { title: string; id: string }[] = [];

  handleLocationChange() {
    const currentPath = window.location.pathname;
    this.setSelectedTab(currentPath);
  }

  postsSubscription: Subscription | undefined;

  ngOnInit() {
    this.setSelectedTab(window.location.pathname);
    this.handleLocationChange();
    this.postsSubscription = this.dataHandlingService.posts.subscribe(
      (newPosts: Post[]) => {
        this.posts = newPosts;
        this.trendings = this.getTrending();
      }
    );
    this.initializeTyped();

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

    if (window.location.pathname.startsWith("/search")) {
      this.userInput = window.location.pathname.slice(8);
    }
    this.onSubmitSearch();
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

  // @HostListener("window:resize")
  // onWindowResize() {
  //   if (window.innerWidth < 992) {
  //     this.searchButtonClicked = false;
  //     this.searchButtonClass = "fa-magnifying-glass";
  //   }
  // } NOT LONGER NEEDED

  changeSearchVisibility(): void {
    this.searchButtonClicked = !this.searchButtonClicked;
    if (this.searchButtonClicked) {
      this.searchButtonClass = this.closeIcon;
      if (this.searchInput) {
        this.searchInput.nativeElement.focus();
      }
    } else {
      this.searchButtonClass = "fa-magnifying-glass";
    }
  }

  userInput: string = "";
  limit: number = 30; // Maximum number of results for a search
  loading: boolean = false;
  searchResults: Result[] = [];

  onSubmitSearch() {
    this.loading = true;
    this.apiCallService
      .getData(`articles/?limit=${this.limit}&search=${this.userInput}`)
      .subscribe({
        next: (data) => {
          this.searchResults = data.results;
          this.SearchResultService.setSearchResults(this.searchResults);
          this.loading = false;
        },
        error: (error) => {
          console.error("Error fetching data, try again later", error);
          this.loading = false;
        },
      });
  }

  performSearch() {
    if (this.userInput.length > 0) {
      this.onSubmitSearch();
      this.router.navigate([`/search/${this.userInput}`]);
    }
  }

  //--------------- TYPED.JS ---------------

  getTrending(): { title: string; id: string }[] {
    const filteredPosts = this.posts.filter((post) => post.priority === true);
    return filteredPosts.map((post) => ({ title: post.title, id: post.id }));
  }

  getPostUrl(postId: string): string {
    return `/forum/post/${postId}`;
  }

  currentStringIndex: number = 0;
  typed: Typed | undefined;
  autoChangeInterval: any | undefined;

  // ngAfterViewInit() {
  //   this.initializeTyped();
  //   this.startAutoChange();
  // }

  // typed.js configuration
  initializeTyped() {
    const options = {
      strings: [this.trendings[this.currentStringIndex].title],
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

  isMobile(): boolean {
    return window.innerWidth < 992;
  }
}
