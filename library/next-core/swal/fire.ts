import Swal, { SweetAlertOptions } from "sweetalert2";

import { HandleError } from "./error";

export function alert(options?: SweetAlertOptions, event?: HandleError) {
	if (event) {
		Swal.fire({
			icon: "error",
			title: `พบข้อผิดพลาด`,
			text: event.notify || undefined,
			footer: `${event.code ?? event.status ? `${event.code ?? event.status}:` : ""} ${event.message || event.base.message} `,
		});

		console.error(event);
	} else {
		Swal.fire(
			Object.assign(
				{},
				{
					title: "hello world",
				} as SweetAlertOptions,
				options,
			),
		);
	}
}
