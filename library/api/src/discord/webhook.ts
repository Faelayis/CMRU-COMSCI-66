import { Axios, AxiosRequestConfig } from "axios";
import { RESTPostAPIWebhookWithTokenJSONBody } from "discord-api-types/v10";

import { discord as baseconfig } from "../axios/config/base.js";
import { interceptors } from "../axios/function/interceptors.js";
import { DdMmYyyy } from "../utils/format-date.js";
import { generate } from "../utils/student-id.js";

export class DiscordWebHook extends Axios {
	constructor(webhook_id, webhook_token, config?: AxiosRequestConfig) {
		super(
			Object.assign({}, config, baseconfig.webhook, {
				method: "post",
				baseURL: `https://discord.com/api/webhooks/${webhook_id}/${webhook_token}`,
			}),
		);

		this.interceptors.request.use(
			function (config) {
				if (!(webhook_id || webhook_token)) return Promise.reject("error").catch((error) => error);
				return config;
			},
			function (error) {
				return Promise.reject(error);
			},
		);

		this.interceptors.response.use(interceptors as never);
	}

	/**
	 * @desc Send Webhook to Discord message channel.
	 * @example
	 * Send(formData, {
	 *   fullname: "Faelayis",
	 *   note: "จ่ายค่าห้อง",
	 *   price: "100",
	 *   studentid: "66143XXX",
	 * });
	 * @param {RESTPostAPIWebhookWithTokenFormDataBody} formData - The form data to send.
	 * @param {object} details - Additional details for the message.
	 * @param {string} details.fullname - The full name of the user.
	 * @param {string} details.note - An optional note for the message.
	 * @param {string} details.price - The price of the transaction.
	 * @param {string} details.studentid - The student ID.
	 * @returns {Promise<ReturnTypeOfSend>} - The result of the API call.
	 */
	public Send = (file: FormDataEntryValue, details: { fullname: string; note: string; price: string; studentid: string }) => {
		const formData = new FormData(),
			{ studentid, fullname, price, note } = details;

		formData.append("file", file);
		formData.append(
			"payload_json",
			JSON.stringify({
				username: "📃 สลิปโอนเงิน",
				avatar_url: `https://reg.cmru.ac.th/registrar/getstudentimageftp.asp?id=${generate(studentid)}`,
				embeds: [
					{
						image: { url: `attachment://${formData.get("file")?.["name"]?.replace(/\s+/g, "_")}` },
						color: formData.get("file")?.["name"] ? 1_752_220 : 15_844_367,
						fields: [
							{
								name: "รหัสนักศีกษา",
								value: `${studentid || "-"}`,
								inline: true,
							},
							{
								name: "ชื่อ",
								value: `${fullname || "-"}`,
								inline: true,
							},
							{
								name: "จำนวนเงิน",
								value: `${price || "-"}`,
								inline: true,
							},
							{
								name: "หมายเหตุ",
								value: `${note || "-"}`,
								inline: true,
							},
						],
						footer: {
							text: DdMmYyyy(new Date()),
						},
						timestamp: new Date().toISOString(),
					},
				],
			} as RESTPostAPIWebhookWithTokenJSONBody),
		);

		return this.post(undefined, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
	};
}
