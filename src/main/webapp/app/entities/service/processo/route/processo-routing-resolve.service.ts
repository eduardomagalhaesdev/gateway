import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProcesso } from '../processo.model';
import { ProcessoService } from '../service/processo.service';

@Injectable({ providedIn: 'root' })
export class ProcessoRoutingResolveService implements Resolve<IProcesso | null> {
  constructor(protected service: ProcessoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProcesso | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((processo: HttpResponse<IProcesso>) => {
          if (processo.body) {
            return of(processo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
