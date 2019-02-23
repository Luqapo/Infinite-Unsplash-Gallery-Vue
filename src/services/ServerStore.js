class ServerStore {
  constructor() {
    if (!ServerStore.instance) {
      this._server = {};
      ServerStore.instance = this;
    }
    return ServerStore.instance;
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

const instance = new ServerStore();
//Object.freeze(instance);

export default instance;
