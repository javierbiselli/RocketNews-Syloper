// Angular Imports
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
// This Module Imports
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { NewsContainerComponent } from "./components/news-container/news-container.component";
import { ContactFormComponent } from "./components/contact-form/contact-form.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PaidServiceComponent } from "./components/paid-service/paid-service.component";
import { ForumComponent } from "./components/forum/forum.component";
import { SearchContainerComponent } from "./components/search-container/search-container.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewsContainerComponent,
    ContactFormComponent,
    PaidServiceComponent,
    ForumComponent,
    SearchContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: NewsContainerComponent },
      { path: "blogs", component: NewsContainerComponent },
      { path: "reports", component: NewsContainerComponent },
      { path: "contact", component: ContactFormComponent },
      { path: "forum", component: ForumComponent },
      { path: "search", component: SearchContainerComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
