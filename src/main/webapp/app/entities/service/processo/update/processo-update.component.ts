import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ProcessoFormService, ProcessoFormGroup } from './processo-form.service';
import { IProcesso } from '../processo.model';
import { ProcessoService } from '../service/processo.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { Municipio } from 'app/model/municipio';
import { Uf } from 'app/model/uf';
import { IbgeService } from '../service/ibge.service';

@Component({
  selector: 'jhi-processo-update',
  templateUrl: './processo-update.component.html',
})
export class ProcessoUpdateComponent implements OnInit {
  isSaving = false;
  processo: IProcesso | null = null;
  ufs: Uf[] = [];
  municipios: Municipio[] = [];

  editForm: ProcessoFormGroup = this.processoFormService.createProcessoFormGroup();
  uf: any;

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected processoService: ProcessoService,
    protected processoFormService: ProcessoFormService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private ibgeService: IbgeService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ processo }) => {
      this.ibgeService.getUfs().subscribe(data => {
        this.ufs = data;
      });
      this.processo = processo;
      if (processo) {
        this.updateForm(processo);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('gatewayApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const processo = this.processoFormService.getProcesso(this.editForm);
    if (processo.id !== null) {
      this.subscribeToSaveResponse(this.processoService.update(processo));
    } else {
      this.subscribeToSaveResponse(this.processoService.create(processo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProcesso>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(processo: IProcesso): void {
    this.processo = processo;
    this.processoFormService.resetForm(this.editForm, processo);
  }

  protected onUfSelected(event: any): void {
    const selectedUf = event.target.value;
    this.ibgeService.getMunicipiosByUf(selectedUf).subscribe(data => {
      this.municipios = data;
    });
  }
}
