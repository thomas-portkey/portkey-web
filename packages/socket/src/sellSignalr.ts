import { BaseSignalr } from './signalr';
import { AchTxAddressReceivedType, RequestOrderTransferredType } from './types/sell';

export class SignalrSell extends BaseSignalr {
  public requestAchTxAddress(clientId: string, orderId: string) {
    console.log('invoke RequestAchTxAddress', clientId, orderId);
    this.invoke('RequestAchTxAddress', {
      TargetClientId: clientId,
      OrderId: orderId,
    });
  }

  public onAchTxAddressReceived(
    { orderId }: { clientId: string; orderId: string },
    callback: (data: AchTxAddressReceivedType | null) => void,
  ) {
    return this.listen('onAchTxAddressReceived', (data: { body: AchTxAddressReceivedType }) => {
      if (data?.body?.orderId === orderId) {
        callback(data.body);
      } else {
        callback(null);
      }
    });
  }

  public requestOrderTransferred(clientId: string, orderId: string) {
    console.log('invoke RequestOrderTransferred', clientId, orderId);
    this.invoke('RequestOrderTransferred', {
      TargetClientId: clientId,
      OrderId: orderId,
    });
  }

  public onRequestOrderTransferred(
    { orderId }: { clientId: string; orderId: string },
    callback: (data: RequestOrderTransferredType | null) => void,
  ) {
    return this.listen('onOrderTransferredReceived', (data: { body: RequestOrderTransferredType }) => {
      if (data?.body?.orderId === orderId) {
        callback(data.body);
      } else {
        callback(null);
      }
    });
  }
}

export const sellListenList = ['onAchTxAddressReceived', 'onOrderTransferredReceived'] as const;

export const signalrSell = new SignalrSell({
  listenList: sellListenList,
}) as BaseSignalr<typeof sellListenList> & SignalrSell;