// ibge.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Municipio } from 'app/model/municipio';
import { Uf } from 'app/model/uf';

@Injectable({
  providedIn: 'root',
})
export class IbgeService {
  private apiUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades';
  private apiUrl2 = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios';

  constructor(private http: HttpClient) {}

  getUfs(): Observable<Uf[]> {
    const url = `${this.apiUrl}/estados`;
    return this.http.get<Uf[]>(url);
  }

  getMunicipiosByUf(ufSigla: string): Observable<Municipio[]> {
    const url = `${this.apiUrl}/estados/${ufSigla}/municipios`;
    return this.http.get<Municipio[]>(url);
  }
}
