class ServerStore {
  constructor() {
    this._server = {};
  }
  set(server) {
    this._server = {
      url: server.url,
      key: server.key
    };
  }

  get() {
    return this._server;
  }
}

export const store = new ServerStore();
