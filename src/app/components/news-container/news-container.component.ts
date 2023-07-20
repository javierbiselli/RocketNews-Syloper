import { Component, HostListener, OnInit } from "@angular/core";
import { Article } from "@shared/models";
import { ApiCallService } from "@shared/services";

@Component({
  selector: "app-news-container",
  templateUrl: "./news-container.component.html",
  styleUrls: ["./news-container.component.scss"],
})
export class NewsContainerComponent implements OnInit {
  constructor(private apiCallService: ApiCallService) {}

  loading: boolean = true;
  imageLoading: { [key: number]: boolean } = {};

  apiData: any;
  articles: Article[] = [];
  limit: number = 6;
  offset: number = 0;

  maxNews: number = 48; // Maximum number of articles loaded on scroll

  apiCall() {
    this.loading = true;
    this.apiCallService
      .getData(`articles/?limit=${this.limit}&offset=${this.offset}`)
      .subscribe(
        (data) => {
          this.apiData = data;
          this.articles = data.results;
          this.loading = false;
          this.articles.forEach((article) => {
            this.imageLoading[article.id] = true;
          });
        },
        (error) => {
          console.error("Error fetching data, try again later", error);
          this.loading = false;
        }
      );
  }

  loadMoreElements() {
    if (this.offset + 6 < this.maxNews) {
      this.loading = true;
      this.offset += this.limit;
      this.apiCallService
        .getData(`articles/?limit=${this.limit}&offset=${this.offset}`)
        .subscribe(
          (data) => {
            this.apiData = data;
            const newArticles = data.results;
            this.articles.push(...newArticles);
            this.loading = false;

            newArticles.forEach((article: any) => {
              this.imageLoading[article.id] = true;
            });
          },
          (error) => {
            console.error("Error fetching data, try again later", error);
            this.loading = false;
          }
        );
    }
  }

  onImageLoad(articleId: number) {
    this.imageLoading[articleId] = false;
  }

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
      html.offsetHeight
    );
    const windowBottom = window.innerHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      this.loadMoreElements();
    }
  }
  ngOnInit() {
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

  isFullElement(array: Article[], element: Article): boolean {
    const index = array.indexOf(element);
    return index === 0 || index % 6 === 0;
  }
}
