import { Mesorregiao } from './masorregiao';

export interface Microrregiao {
  id: number;
  nome: string;
  mesorregiao: Mesorregiao;
}
