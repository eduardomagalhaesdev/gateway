import dayjs from 'dayjs/esm';

import { IProcesso, NewProcesso } from './processo.model';

export const sampleWithRequiredData: IProcesso = {
  id: 70541,
  npu: 'ddddddd-ddLdddd9dZddOdddd',
  dataCadastro: dayjs('2024-06-18'),
  municipio: 'Avenida SCSI Borders',
  uf: 'quantify',
  anexoPdf: '../fake-data/blob/hipster.png',
  anexoPdfContentType: 'unknown',
  upload: 'user-facing',
};

export const sampleWithPartialData: IProcesso = {
  id: 67524,
  npu: 'ddddddd-ddgddddJd\vdd\bdddd',
  dataCadastro: dayjs('2024-06-19'),
  municipio: 'Manager Paraná',
  uf: 'invoice',
  anexoPdf: '../fake-data/blob/hipster.png',
  anexoPdfContentType: 'unknown',
  upload: 'Jardim Brinquedos',
};

export const sampleWithFullData: IProcesso = {
  id: 35034,
  npu: 'ddddddd-dd\bdddd\5d!dd?dddd',
  dataCadastro: dayjs('2024-06-19'),
  municipio: 'capacitor',
  uf: 'JBOD',
  anexoPdf: '../fake-data/blob/hipster.png',
  anexoPdfContentType: 'unknown',
  upload: 'Orchestrator Aço Avon',
};

export const sampleWithNewData: NewProcesso = {
  npu: 'ddddddd-dd.dddd;d\vdd<dddd',
  dataCadastro: dayjs('2024-06-19'),
  municipio: 'strategic Prático relationships',
  uf: 'Lesoto',
  anexoPdf: '../fake-data/blob/hipster.png',
  anexoPdfContentType: 'unknown',
  upload: 'Robust Sterling',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
