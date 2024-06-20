import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IProcesso } from '../processo.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../processo.test-samples';

import { ProcessoService, RestProcesso } from './processo.service';

const requireRestSample: RestProcesso = {
  ...sampleWithRequiredData,
  dataCadastro: sampleWithRequiredData.dataCadastro?.format(DATE_FORMAT),
};

describe('Processo Service', () => {
  let service: ProcessoService;
  let httpMock: HttpTestingController;
  let expectedResult: IProcesso | IProcesso[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProcessoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Processo', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const processo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(processo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Processo', () => {
      const processo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(processo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Processo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Processo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Processo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addProcessoToCollectionIfMissing', () => {
      it('should add a Processo to an empty array', () => {
        const processo: IProcesso = sampleWithRequiredData;
        expectedResult = service.addProcessoToCollectionIfMissing([], processo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(processo);
      });

      it('should not add a Processo to an array that contains it', () => {
        const processo: IProcesso = sampleWithRequiredData;
        const processoCollection: IProcesso[] = [
          {
            ...processo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProcessoToCollectionIfMissing(processoCollection, processo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Processo to an array that doesn't contain it", () => {
        const processo: IProcesso = sampleWithRequiredData;
        const processoCollection: IProcesso[] = [sampleWithPartialData];
        expectedResult = service.addProcessoToCollectionIfMissing(processoCollection, processo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(processo);
      });

      it('should add only unique Processo to an array', () => {
        const processoArray: IProcesso[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const processoCollection: IProcesso[] = [sampleWithRequiredData];
        expectedResult = service.addProcessoToCollectionIfMissing(processoCollection, ...processoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const processo: IProcesso = sampleWithRequiredData;
        const processo2: IProcesso = sampleWithPartialData;
        expectedResult = service.addProcessoToCollectionIfMissing([], processo, processo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(processo);
        expect(expectedResult).toContain(processo2);
      });

      it('should accept null and undefined values', () => {
        const processo: IProcesso = sampleWithRequiredData;
        expectedResult = service.addProcessoToCollectionIfMissing([], null, processo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(processo);
      });

      it('should return initial array if no Processo is added', () => {
        const processoCollection: IProcesso[] = [sampleWithRequiredData];
        expectedResult = service.addProcessoToCollectionIfMissing(processoCollection, undefined, null);
        expect(expectedResult).toEqual(processoCollection);
      });
    });

    describe('compareProcesso', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProcesso(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareProcesso(entity1, entity2);
        const compareResult2 = service.compareProcesso(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareProcesso(entity1, entity2);
        const compareResult2 = service.compareProcesso(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareProcesso(entity1, entity2);
        const compareResult2 = service.compareProcesso(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
