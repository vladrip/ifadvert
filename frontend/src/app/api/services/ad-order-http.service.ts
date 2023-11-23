import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '@constants/constants';
import { AdOrder } from '@models/ad-order';
import { FormAdOrder } from '@models/form-ad-order';

@Injectable({providedIn: 'root'})
export class AdOrderHttpService {
  private readonly URL = `${API}/ad-orders`;

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<AdOrder[]>(this.URL);
  }

  get(id: number) {
    return this.http.get<AdOrder>(`${this.URL}/${id}`);
  }

  update(id: number, formAdOrder: FormAdOrder) {
    return this.http.put<FormAdOrder>(`${this.URL}/${id}`, formAdOrder);
  }

  create(formAdOrder: FormAdOrder) {
    return this.http.post(this.URL, formAdOrder);
  }
}
