// Angular Imports
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { environment } from '@environment'
// This Module Imports
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NewsContainerComponent } from './components/news-container/news-container.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'


@NgModule({
	declarations: [AppComponent, HeaderComponent, NewsContainerComponent, ContactFormComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forRoot([
			{ path: '', component: NewsContainerComponent },
			{ path: 'contact', component: ContactFormComponent },
		]),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
