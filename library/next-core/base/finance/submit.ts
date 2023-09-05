/* eslint-disable unicorn/custom-error-definition */
import { DiscordWebHook } from "@cmru-comsci-66/api";
import { student } from "@cmru-comsci-66/utils";
import { alert } from "@lib/swal/fire";

class Finance_Submit_Error extends Error {
	name: string;
	base?: Error;
	code: string;
	notify: string;
	status: string;

	constructor(code: string, message: string, base?: Error, detall?: { notify?: string }) {
		super(message);
		this.name = "FINANCE_SUBMIT_ERROR";
		this.code = code;
		this.base = base;
		this.notify = detall?.notify;
	}
}

export class Handle {
	private webhook: DiscordWebHook;
	private value: {
		file: FormDataEntryValue;
		fullname: string;
		note: string;
		price: string;
		studentid: string;
	};

	constructor() {
		this.initialize();
	}

	private initialize() {
		this.value = {
			studentid: "",
			fullname: "1",
			price: "1",
			note: "1",
			file: undefined,
		};
	}

	private createWebhooks() {
		this.webhook = new DiscordWebHook(process.env.DISCORD_WEBHOOK_ID, process.env.DISCORD_WEBHOOK_TOKEN);
	}

	public set files(files: FormDataEntryValue) {
		this.value.file = files;
	}

	public set fullname(name: string) {
		this.value.fullname = name;
	}

	public set studentid(id: string) {
		try {
			const getId = student.id.generate(id);
			this.value.studentid = getId;
		} catch (error) {
			alert(undefined, error);
			return;
		}
	}

	public set price(price: string) {
		this.value.price = price;
	}

	public set note(note: string) {
		this.value.note = note;
	}

	public send() {
		if (!this.value.file || !this.value.fullname || !this.value.studentid || !this.value.price || !this.value.note) {
			return alert({
				icon: "warning",
				title: "ข้อมูลไม่ครบถ้วน",
				text: "กรุณากรอกข้อมูลให้ครบถ้วนก่อนที่จะส่งข้อมูล",
			});
		}

		if (!this.webhook) return;
		try {
			return this.webhook.Send(this.value.file, {
				studentid: this.value.studentid,
				fullname: this.value.fullname,
				price: this.value.price,
				note: this.value.note,
			});
		} catch (error) {
			return alert(undefined, new Finance_Submit_Error("FINANCE_SUBMIT_SEND_ERROR", undefined, error));
		}
	}
}
