import { Icart } from './icart';

export interface CartResponse {
  success: boolean;
  itemsCount: number;
  data: Icart;
}
