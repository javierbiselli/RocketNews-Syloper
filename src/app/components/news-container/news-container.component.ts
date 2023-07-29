import { Component, HostListener, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Result, User } from "@shared/models";
import { ApiCallService } from "@shared/services";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-news-container",
  templateUrl: "./news-container.component.html",
  styleUrls: ["./news-container.component.scss"],
})
export class NewsContainerComponent implements OnInit {
  constructor(
    private apiCallService: ApiCallService,
    private route: ActivatedRoute,
    private authenticationService: AuthService,
    ) {}
    
  userValue: User | null | undefined;
  userLogged = new BehaviorSubject<boolean>(false);

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

    this.authenticationService.user.subscribe(data => {
      this.userValue = data;
      console.log('SUBSCRIBED');
      console.log(data);
      if (localStorage.getItem('showPublicity')?.valueOf() === 'false') {
        console.log(this.showPublicity);
        this.showPublicity = !this.showPublicity;
        console.log(this.showPublicity);
      }
      // if (!data) {
      //   console.log(this.showPublicity);
      //   this.showPublicity = !this.showPublicity;
      //   console.log(this.showPublicity);
      //   // this.showPublicity = !this.showPublicity;
      //   // console.log(this.showPublicity);
      // }
      // poner falso al logout y pasar el if de aca abajo a una funcion externa para llamarla
      //desde aca y desde el subscribe de aca arriba cuando showPublicity es falso 
    });

    this.setShowPublicity();
    

    // if (this.userValue != null && !(this.userLogged.asObservable())) { // yes-user, before-no
    //   console.log('user log in') // --------------------------------------------
    //   this.showPublicity = true;
    //   this.userLogged.next(true);
    // } else if (this.userValue = null && this.userLogged.asObservable()) { //not-user, before-yes
    //   console.log('user logged out') // --------------------------------------------
    //   this.showPublicity = true;
    //   this.userLogged.next(false);
    // } else {
    //   console.log('all default') // --------------------------------------------
    // }

    // if (this.userLogged.asObservable()) {
    //   this.showPublicity = true;
    // }

    
    
    
    //show = false
    // if (this.userValue != null) { // logged!
    //   console.log('userLogged = true') // --------------------------------------------
    //   this.userLogged.next(true);
    // } else if (this.userValue = null) { //not logged
    //   console.log('userLogged = false') // --------------------------------------------
    //   this.userLogged.next(false);
    // } else {
    //   console.log('userLogged = not value') // --------------------------------------------
    // }

    // if (this.userLogged.asObservable()) {
    //   this.showPublicity = true;
    // }




    // //show = false
    // if (this.userLogged.asObservable()) { // logged!
    //   console.log('userLogged = true') // --------------------------------------------
      
    //   this.userLogged.next(true);
    // } else if (!this.userLogged.asObservable()) { //not logged
    //   console.log('userLogged = false') // --------------------------------------------
    // } else {
    //   console.log('userLogged = not value') // --------------------------------------------
    // }
  }

  // showPublicityReset() {
    // if (this.userValue != null && !(this.userLogged.asObservable())) { // yes-user, before-no
    //   console.log('user log in') // --------------------------------------------
    //   this.showPublicity = true;
    //   this.userLogged.next(true);
    // } else if (this.userValue = null && this.userLogged.asObservable()) { //not-user, before-yes
    //   console.log('user logged out') // --------------------------------------------
    //   this.showPublicity = true;
    //   this.userLogged.next(false);
    // } else {
    //   console.log('all default') // --------------------------------------------
    // }

    // if (this.userLogged.asObservable()) {  
    //   this.showPublicity = true;
    // }
  // }

  setShowPublicity() {
    if (!localStorage.getItem('showPublicity')) {
      this.showPublicity = true;
      localStorage.setItem('showPublicity', 'true');
    } else {
      if (localStorage.getItem('showPublicity')?.valueOf() === 'true') {
        this.showPublicity = true;
      } else {
        this.showPublicity = false;
      }
    }
  }

  hidePublicity() {
    localStorage.setItem('showPublicity', 'false');
    this.showPublicity = false;
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
