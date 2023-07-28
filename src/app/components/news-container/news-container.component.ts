import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Result } from "@shared/models";
import { ApiCallService } from "@shared/services";

@Component({
  selector: "app-news-container",
  templateUrl: "./news-container.component.html",
  styleUrls: ["./news-container.component.scss"],
})
export class NewsContainerComponent implements OnInit {
  constructor(
    private apiCallService: ApiCallService,
    private route: ActivatedRoute
  ) {}

  loading: boolean = true;
  imageLoading: { [key: number]: boolean } = {};

  apiData: any;
  articles: Result[] = [];
  dataName: string = "articles";
  limit: number = 6;
  offset: number = 0;

  showPublicity: boolean = true;

  maxNews: number = 30; // Maximum number of articles loaded on scroll

  apiCall() {
    this.loading = true;
    this.apiCallService
      .getData(`${this.dataName}/?limit=${this.limit}&offset=${this.offset}`)
      .subscribe({
        next: (data) => {
          this.apiData = data;
          const newArticles = data.results;
          this.articles.push(...newArticles);
          this.loading = false;

          newArticles.forEach((article: Result) => {
            this.imageLoading[article.id] = true;
          });
        },
        error: (error) => {
          console.error("Error fetching data, try again later", error);
          this.loading = false;
        },
      });
  }

  loadMoreElements() {
    if (this.offset + 6 < this.maxNews) {
      this.loading = true;
      this.offset += this.limit;
      this.apiCallService
        .getData(`${this.dataName}/?limit=${this.limit}&offset=${this.offset}`)
        .subscribe({
          next: (data) => {
            this.apiData = data;
            const newArticles = data.results;
            this.articles.push(...newArticles);
            this.loading = false;

            newArticles.forEach((article: Result) => {
              this.imageLoading[article.id] = true;
            });
          },
          error: (error) => {
            console.error("Error fetching data, try again later", error);
            this.loading = false;
          },
        });
    }
  }

  onImageLoad(articleId: number) {
    this.imageLoading[articleId] = false;
  }

  scrollOffset: number = 0.99;

  @HostListener("window:scroll", ["$event"])
  @HostListener("window:touchmove", ["$event"])
  onScroll() {
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
      window.innerHeight
    );
    const windowBottom = window.innerHeight + window.pageYOffset;

    const loadMoreTriggerPoint = docHeight * this.scrollOffset;

    if (windowBottom >= loadMoreTriggerPoint) {
      this.loadMoreElements();
    }
  }

  title: string = "";

  ngOnInit() {
    const segments = this.route.snapshot.url;
    if (segments.length > 0 && segments[0].path === "blogs") {
      this.dataName = "blogs";
      this.title = "Rocket news Blogs";
    } else if (segments.length > 0 && segments[0].path === "reports") {
      this.dataName = "reports";
      this.title = "ISS latests reports";
    } else {
      this.dataName = "articles";
      this.title = "Latest news on space";
    }
    this.apiCall();
  }

  getDate(rawDate: string) {
    const dateObj: Date = new Date(rawDate);

    const monthNames: Array<string> = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month: string = monthNames[dateObj.getMonth()];
    const day: number = dateObj.getDate();
    const year: number = dateObj.getFullYear();
    let hour: number = dateObj.getHours();
    const minute: string = dateObj.getMinutes().toString().padStart(2, "0");
    let period: string = "am";

    if (hour >= 12) {
      period = "pm";
      if (hour > 12) {
        hour -= 12;
      }
    }

    return `${month} ${day}, ${year} | ${hour}:${minute} ${period}`;
  }

  isDesktop(): boolean {
    return window.innerWidth > 1200;
  }

  isFullElement(array: Result[], element: Result): boolean {
    const index = array.indexOf(element);
    return index === 0 || index % 6 === 0;
  }

  loadMore(): void {
    this.maxNews = this.maxNews + 30;
    this.loadMoreElements();
  }
}
