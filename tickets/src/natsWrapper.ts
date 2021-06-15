import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clusterId, { url });

    return new Promise((resolve, reject) => {
      this._client!.on('connect', () => {
        console.log('Connected to NATS');
        resolve({});
      });
      this._client!.on('error', (error) => {
        reject(error);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
