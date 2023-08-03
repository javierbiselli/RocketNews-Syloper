import { Component, OnInit } from "@angular/core";
import { ApiCallService } from "@shared/services";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  constructor(private apiCallService: ApiCallService) {}

  imageLoading: { [key: number]: boolean } = {};
  loading: boolean = true;

  apiData: any;
  article: any;
  dataName: string = "articles";
  limit: number = 1;
  offset: number = 0;

  ngOnInit(): void {
    this.apiCall();
  }

  apiCall() {
    this.loading = true;
    this.apiCallService
      .getData(`${this.dataName}/?limit=${this.limit}&offset=${this.offset}`)
      .subscribe({
        next: (data) => {
          this.apiData = data;
          const newArticles = data.results[0];
          console.log(newArticles); // ----------------------------------------------------
          this.article = newArticles;

          this.imageLoading[newArticles.id] = true;
          console.log(this.imageLoading); // ---------------------------------------------
          this.loading = false;
        },
        error: (error) => {
          console.error("Error fetching data, try again later", error);
          this.loading = false;
        },
      });
  }

  onImageLoad(articleId: number) {
    this.imageLoading[articleId] = false;
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
