class StudentIDError extends Error {
	code: string;
	notify: string;

	constructor(code: string, message: string, detall?: { notify?: string }) {
		super(message);
		this.name = "StudentIDError";
		this.code = code;
		this.notify = detall.notify;
	}
}

export function match() {
	throw new StudentIDError("NO_MATCH_STUDENT_ID", "ไม่พบรหัสนักศึกษา", {});
}

export function generate(input: string | number) {
	if (typeof input === "number") {
		input = input.toString();
	}

	if (input.length === 3) {
		return `66143${input}`;
	} else if (input.length === 8 && input) {
		const pattern = /6614[35]/g;

		if (pattern.test(input)) {
			return input;
		}
	}

	throw new StudentIDError("INVALID_STUDENT_ID_FORMAT", "รูปแบบรหัสนักศึกษาไม่ถูกต้อง", { notify: "กรุณาใส่รหัสนักศึกษาให้ถูกต้อง 66143420 หรือ 420" });
}
