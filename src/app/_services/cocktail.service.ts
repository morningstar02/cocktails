import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  constructor(private http: HttpClient) { }

  searchByName(name: string) {
    return this.http.get<any>(environment.base_url + `search.php?s=${name}`)
      .pipe(map(data => data));
  }

  filterByAlcoholic(type: string) {
    return this.http.get<any>(environment.base_url + `filter.php?a=${type}`)
      .pipe(map(data => data));
  }

}