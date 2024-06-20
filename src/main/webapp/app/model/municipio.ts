import { Microrregiao } from './microrregiao';

export interface Municipio {
  id: number;
  nome: string;
  microrregiao: Microrregiao;
}
