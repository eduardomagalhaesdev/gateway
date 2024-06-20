import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../processo.test-samples';

import { ProcessoFormService } from './processo-form.service';

describe('Processo Form Service', () => {
  let service: ProcessoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessoFormService);
  });

  describe('Service methods', () => {
    describe('createProcessoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProcessoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            npu: expect.any(Object),
            dataCadastro: expect.any(Object),
            municipio: expect.any(Object),
            uf: expect.any(Object),
            anexoPdf: expect.any(Object),
            upload: expect.any(Object),
          })
        );
      });

      it('passing IProcesso should create a new form with FormGroup', () => {
        const formGroup = service.createProcessoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            npu: expect.any(Object),
            dataCadastro: expect.any(Object),
            municipio: expect.any(Object),
            uf: expect.any(Object),
            anexoPdf: expect.any(Object),
            upload: expect.any(Object),
          })
        );
      });
    });

    describe('getProcesso', () => {
      it('should return NewProcesso for default Processo initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createProcessoFormGroup(sampleWithNewData);

        const processo = service.getProcesso(formGroup) as any;

        expect(processo).toMatchObject(sampleWithNewData);
      });

      it('should return NewProcesso for empty Processo initial value', () => {
        const formGroup = service.createProcessoFormGroup();

        const processo = service.getProcesso(formGroup) as any;

        expect(processo).toMatchObject({});
      });

      it('should return IProcesso', () => {
        const formGroup = service.createProcessoFormGroup(sampleWithRequiredData);

        const processo = service.getProcesso(formGroup) as any;

        expect(processo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProcesso should not enable id FormControl', () => {
        const formGroup = service.createProcessoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProcesso should disable id FormControl', () => {
        const formGroup = service.createProcessoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
