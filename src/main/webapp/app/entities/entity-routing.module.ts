import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'processo',
        data: { pageTitle: 'gatewayApp.serviceProcesso.home.title' },
        loadChildren: () => import('./service/processo/processo.module').then(m => m.ServiceProcessoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
