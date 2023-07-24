import { Component, OnInit } from "@angular/core";
import { Post } from "@shared/models";
import { DataHandlingService } from "src/app/services/data-handling.service";

@Component({
  selector: "app-forum",
  templateUrl: "./forum.component.html",
  styleUrls: ["./forum.component.scss"],
})
export class ForumComponent implements OnInit {
  constructor(private dataHandlingService: DataHandlingService) {}

  posts: Post[] = [];

  ngOnInit(): void {
    this.posts = this.dataHandlingService.posts.getValue();
    this.sortPosts(0);
  }

  order: number = 0;

  changeOrder(event: any): void {
    const selectedValue = event.target.value;

    this.sortPosts(Number(selectedValue));
  }

  sortPosts(order: number): void {
    this.order = order;
    if (this.order === 1) {
      this.posts.sort((a, b) => b.comments.length - a.comments.length);
    } else if (this.order === 2) {
      this.posts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    } else if (this.order === 3) {
      this.posts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
    } else {
      this.posts.sort((a, b) => {
        if (a.priority && !b.priority) {
          return -1;
        } else if (!a.priority && b.priority) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }
}
