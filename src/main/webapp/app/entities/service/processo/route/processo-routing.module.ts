import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProcessoComponent } from '../list/processo.component';
import { ProcessoDetailComponent } from '../detail/processo-detail.component';
import { ProcessoUpdateComponent } from '../update/processo-update.component';
import { ProcessoRoutingResolveService } from './processo-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const processoRoute: Routes = [
  {
    path: '',
    component: ProcessoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProcessoDetailComponent,
    resolve: {
      processo: ProcessoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProcessoUpdateComponent,
    resolve: {
      processo: ProcessoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProcessoUpdateComponent,
    resolve: {
      processo: ProcessoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(processoRoute)],
  exports: [RouterModule],
})
export class ProcessoRoutingModule {}
