import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API } from "../../constants/constants";
import { AdOrderDto } from "../models/ad-order-dto";

@Injectable({providedIn: 'root'})
export class AdOrderHttpService {
  private readonly URL = `${API}/ad-orders`;

  constructor(private http: HttpClient) {
  }

  getAll() {return this.http.get<AdOrderDto[]>(this.URL);
  }
}
