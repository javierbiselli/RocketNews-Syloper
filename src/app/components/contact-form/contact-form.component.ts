import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { countryList } from 'src/app/models/country';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  constructor() { }

  countries = countryList;

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log(form.value);  // all values
    window.alert('Message sent!');
    form.resetForm();
  }

}