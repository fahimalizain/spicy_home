import axios, { AxiosInstance } from "axios";

export interface GetListParams {
  doctype: string;
  filters?: any;
  fields?: string[];
  limit_page_length?: number;
  order_by?: string;
}

export interface InsertParams {
  doctype: string;
  doc: any;
}

export interface UpdateParams {
  doctype: string;
  name: string;
  doc: any;
}

export default class FrappeClient {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.FRAPPE_HOST,
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.FRAPPE_API_KEY}:${process.env.FRAPPE_API_SECRET}`
        ).toString("base64")}`,
      },
    });
  }

  async authenticate() {
    await this.axios
      .get("/api/method/frappe.auth.get_logged_user")
      .catch((err) => {
        return Promise.reject({
          message: "Frappe Authentication failed",
          err,
        });
      });
    this.log("✅", "Frappe Authentication successful");
  }

  async ping() {
    const response = await this.axios.get("/api/method/ping");
    this.log("✅", response.data.message);
  }

  async get_list(params: GetListParams) {
    const response = await this.axios.get("/api/resource/" + params.doctype, {
      params: {
        filters: JSON.stringify(params.filters),
        fields: JSON.stringify(params.fields),
        limit_page_length: params.limit_page_length,
        order_by: params.order_by,
      },
    });
    return response.data.data;
  }

  async insert(params: InsertParams) {
    // POST axios JSON
    const r = await this.axios
      .post("/api/resource/" + params.doctype, params.doc)
      .catch((err) => {
        return Promise.reject({
          message: "Frappe Insert failed",
          err,
        });
      });

    return r.data;
  }

  async update(params: UpdateParams) {
    // PUT axios JSON
    const r = await this.axios
      .put("/api/resource/" + params.doctype + "/" + params.name, params.doc)
      .catch((err) => {
        return Promise.reject({
          message: "Frappe Update failed",
          err,
        });
      });

    return r.data;
  }

  async post_cmd(cmd: string, params: any) {
    const r = await this.axios
      .post("/api/method/" + cmd, params)
      .catch((err) => {
        return Promise.reject({
          message: "Frappe post_cmd failed",
          err,
        });
      });

    return r.data.message;
  }

  log(...content: any[]) {
    console.log("FrappeClient:", ...content);
  }
}
