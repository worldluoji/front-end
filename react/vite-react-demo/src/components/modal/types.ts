import { PropsWithChildren } from 'react';
export interface ModalActionPayloadType {
    modalId: string,
    args?: Record<string, unknown>,
    force?: boolean
}

export type NidcelModalInParamType = PropsWithChildren<{
  id: string;
  [x: string]: unknown;
}>