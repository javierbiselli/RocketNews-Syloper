import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Post, Comment } from "@shared/models";
import { DataHandlingService } from "src/app/services/data-handling.service";
import { ShareDataService } from "src/app/services/share-data.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private shareDataService: ShareDataService,
    private dataHandlingService: DataHandlingService
  ) {}

  selectedPost: Post | undefined = undefined;

  storedValue = localStorage.getItem("showPublicity");
  showPublicity: boolean = this.storedValue === "true";

  ngOnInit(): void {
    this.shareDataService.selectedPost$.subscribe((post) => {
      this.selectedPost = post;
    });

    if (this.selectedPost === undefined) {
      this.route.paramMap.subscribe((params) => {
        const postId = String(params.get("id"));
        console.log(postId);
        this.getPostById(postId);
      });
    }

    if (this.selectedPost && this.selectedPost.comments) {
      this.selectedPost.comments.forEach((comment: Comment) => {
        comment.rating = this.mockRating();
      });
    }
  }

  getPostById(id: string) {
    this.dataHandlingService.getPostById(id).subscribe({
      next: (post) => {
        this.selectedPost = post;
      },
      error: (err) => console.error("Error fetching post by id", err),
    });
  }

  isLiked = false;

  toggleButton(): void {
    this.isLiked = !this.isLiked;
  }

  mockRating(): number {
    return Math.floor(Math.random() * 21) - 10; // generates number between -10 and 10
  }

  selectedCommentId: string | undefined = undefined;
  selectedButtons: { [commentId: string]: "add" | "subtract" | null } = {};

  rate(comment: Comment, value: number): void {
    const isSelected =
      this.selectedButtons[comment.id] === (value === 1 ? "add" : "subtract");

    if (isSelected) {
      if (value === 1) {
        comment.rating -= 1;
      } else {
        comment.rating += 1;
      }
      this.selectedButtons[comment.id] = null;
    } else {
      if (this.selectedButtons[comment.id] === "add") {
        comment.rating -= 1;
      } else if (this.selectedButtons[comment.id] === "subtract") {
        comment.rating += 1;
      }
      this.selectedButtons[comment.id] = value === 1 ? "add" : "subtract";
      comment.rating += value;
    }
  }
}
