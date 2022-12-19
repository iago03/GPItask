import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '../shared/interface/http-response-interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  updatePrice(id: number, price: number) {
    return this.http.post(
      `${environment.api_url}Api/SetPrice/${id}/${price}`,
      {}
    );
  }

  getCompany() {
    return this.http
      .get<Array<HttpResponse>>(`${environment.api_url}Api/GetAllCompanies`)
      .pipe(
        concatMap((o: any) => {
          return this.http
            .get<any>(`${environment.api_url}Api/GetAllPrices`)
            .pipe(
              map((res: any) => {
                const newArray: any = [];
                o.data.forEach((i: any) => {
                  const item = {
                    company: i.name,
                    markets: res.data.filter(
                      (o: any) => i.name === o.company.name
                    ),
                  };
                  newArray.push(item);
                });
                return newArray;
              })
            );
        })
      );
  }
}
