import { Component, OnInit } from "@angular/core";
import { Post, User } from "@shared/models";
import { DataHandlingService } from "src/app/services/data-handling.service";

@Component({
  selector: "app-posting",
  templateUrl: "./posting.component.html",
  styleUrls: ["./posting.component.scss"],
})
export class PostingComponent implements OnInit {
  constructor(private dataHandlingService: DataHandlingService) {}

  posts: Post[] = [];
  currentUser!: User;
  postId: number = 0;
  title: string = "";
  content: string = "";

  ngOnInit(): void {
    this.dataHandlingService.posts.subscribe({
      next: (posts) => {
        this.posts = posts;
        this.postId = this.posts.length + 1;
      },
      error: (err) => console.error(err),
    });
    this.loadCurrentUserFromLocalStorage();
  }

  private getFormattedDate(): string {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    return `${month}/${day}/${year}`;
  }

  post(): void {
    if (this.title.length > 0 && this.content.length > 0) {
      const post = {
        id: this.postId.toString(),
        title: this.title,
        author: this.currentUser,
        date: this.getFormattedDate(),
        content: this.content,
        comments: [],
        priority: false,
      };

      if (this.currentUser.isPremium) {
        const shouldHighlight = confirm(
          "You are a premium user, do you want to prioritize your post?"
        );

        if (shouldHighlight) {
          post.priority = true;
        } else {
          post.priority = false;
        }
      }
      this.dataHandlingService.pushPost(post);
    }
  }

  loadCurrentUserFromLocalStorage() {
    const currentUserJSON = localStorage.getItem("currentUser");
    if (currentUserJSON) {
      try {
        this.currentUser = JSON.parse(currentUserJSON) as User;
      } catch (error) {
        console.error("Error parsing currentUser from localStorage:", error);
      }
    }
  }
}
