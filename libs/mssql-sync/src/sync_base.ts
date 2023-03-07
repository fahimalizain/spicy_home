import FrappeClient from "./frappe-client";

export default class SyncBase {
  constructor(protected client: FrappeClient) {}

  async syncAll() {
    // throw not implemented
    throw new Error("Not Implemented");
  }
}
