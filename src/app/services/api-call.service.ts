import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environment";
import { Data } from "../models";

@Injectable({
  providedIn: "root",
})
export class ApiCallService {
  constructor(private http: HttpClient) {}

  getData(endPoint: string): Observable<Data> {
    return this.http.get<Data>(`${environment.api_URL}/${endPoint}`);
  }
}
