import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProcessoComponent } from './list/processo.component';
import { ProcessoDetailComponent } from './detail/processo-detail.component';
import { ProcessoUpdateComponent } from './update/processo-update.component';
import { ProcessoDeleteDialogComponent } from './delete/processo-delete-dialog.component';
import { ProcessoRoutingModule } from './route/processo-routing.module';

@NgModule({
  imports: [SharedModule, ProcessoRoutingModule],
  declarations: [ProcessoComponent, ProcessoDetailComponent, ProcessoUpdateComponent, ProcessoDeleteDialogComponent],
})
export class ServiceProcessoModule {}
