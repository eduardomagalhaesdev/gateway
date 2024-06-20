import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProcesso, NewProcesso } from '../processo.model';

export type PartialUpdateProcesso = Partial<IProcesso> & Pick<IProcesso, 'id'>;

type RestOf<T extends IProcesso | NewProcesso> = Omit<T, 'dataCadastro'> & {
  dataCadastro?: string | null;
};

export type RestProcesso = RestOf<IProcesso>;

export type NewRestProcesso = RestOf<NewProcesso>;

export type PartialUpdateRestProcesso = RestOf<PartialUpdateProcesso>;

export type EntityResponseType = HttpResponse<IProcesso>;
export type EntityArrayResponseType = HttpResponse<IProcesso[]>;

@Injectable({ providedIn: 'root' })
export class ProcessoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/processos', 'service');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(processo: NewProcesso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(processo);
    return this.http
      .post<RestProcesso>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(processo: IProcesso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(processo);
    return this.http
      .put<RestProcesso>(`${this.resourceUrl}/${this.getProcessoIdentifier(processo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(processo: PartialUpdateProcesso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(processo);
    return this.http
      .patch<RestProcesso>(`${this.resourceUrl}/${this.getProcessoIdentifier(processo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestProcesso>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestProcesso[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProcessoIdentifier(processo: Pick<IProcesso, 'id'>): number {
    return processo.id;
  }

  compareProcesso(o1: Pick<IProcesso, 'id'> | null, o2: Pick<IProcesso, 'id'> | null): boolean {
    return o1 && o2 ? this.getProcessoIdentifier(o1) === this.getProcessoIdentifier(o2) : o1 === o2;
  }

  addProcessoToCollectionIfMissing<Type extends Pick<IProcesso, 'id'>>(
    processoCollection: Type[],
    ...processosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const processos: Type[] = processosToCheck.filter(isPresent);
    if (processos.length > 0) {
      const processoCollectionIdentifiers = processoCollection.map(processoItem => this.getProcessoIdentifier(processoItem)!);
      const processosToAdd = processos.filter(processoItem => {
        const processoIdentifier = this.getProcessoIdentifier(processoItem);
        if (processoCollectionIdentifiers.includes(processoIdentifier)) {
          return false;
        }
        processoCollectionIdentifiers.push(processoIdentifier);
        return true;
      });
      return [...processosToAdd, ...processoCollection];
    }
    return processoCollection;
  }

  protected convertDateFromClient<T extends IProcesso | NewProcesso | PartialUpdateProcesso>(processo: T): RestOf<T> {
    return {
      ...processo,
      dataCadastro: processo.dataCadastro?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restProcesso: RestProcesso): IProcesso {
    return {
      ...restProcesso,
      dataCadastro: restProcesso.dataCadastro ? dayjs(restProcesso.dataCadastro) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestProcesso>): HttpResponse<IProcesso> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestProcesso[]>): HttpResponse<IProcesso[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
