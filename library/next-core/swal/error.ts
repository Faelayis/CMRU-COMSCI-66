/* eslint-disable unicorn/custom-error-definition */
export class HandleError extends Error {
	name: string;
	base?: Error;
	code: string;
	notify: string;
	status: string;

	constructor(code: string, message: string, base?: Error, detall?: { notify?: string }) {
		super(message);
		this.code = code;
		this.base = base;
		this.notify = detall?.notify;
	}
}
