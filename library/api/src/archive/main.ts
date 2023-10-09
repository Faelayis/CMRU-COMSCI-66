import { Axios, AxiosRequestConfig } from "axios";

import { discord as baseconfig } from "../axios/config/base.js";
import { interceptors } from "../axios/function/interceptors.js";
import type { MetaData } from "./types.js";

export class Archive extends Axios {
	constructor(baseURL?: string, config?: AxiosRequestConfig) {
		super(
			Object.assign({}, config, baseconfig.webhook, {
				method: "get",
				baseURL: baseURL || process.env.API_ARCHIVE_URL,
			}),
		);

		this.interceptors.request.use(
			function (config) {
				return config;
			},
			function (error) {
				return Promise.reject(error);
			},
		);

		this.interceptors.response.use(interceptors as never);
	}

	public async GetMetaData(): Promise<MetaData> {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return this.get("/metadata.json").then((data: any) => data?.metadata);
	}
}
