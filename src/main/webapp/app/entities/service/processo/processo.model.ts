import dayjs from 'dayjs/esm';

export interface IProcesso {
  id: number;
  npu?: string | null;
  dataCadastro?: dayjs.Dayjs | null;
  municipio?: string | null;
  uf?: string | null;
  anexoPdf?: string | null;
  anexoPdfContentType?: string | null;
  upload?: string | null;
}

export type NewProcesso = Omit<IProcesso, 'id'> & { id: null };
