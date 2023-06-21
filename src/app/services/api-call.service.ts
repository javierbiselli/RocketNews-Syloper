import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environment";

@Injectable({
  providedIn: "root",
})
export class ApiCallService {
  constructor(private http: HttpClient) {}

  getData(endPoint: string): Observable<any> {
    return this.http.get(`${environment.api_URL}/${endPoint}`);
  }
}
