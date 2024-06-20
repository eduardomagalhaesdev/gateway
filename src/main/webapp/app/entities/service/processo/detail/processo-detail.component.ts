import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProcesso } from '../processo.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-processo-detail',
  templateUrl: './processo-detail.component.html',
})
export class ProcessoDetailComponent implements OnInit {
  processo: IProcesso | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ processo }) => {
      this.processo = processo;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
