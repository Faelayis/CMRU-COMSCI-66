class Student_id_Error extends Error {
	code: string;
	notify: string;

	constructor(code: string, message: string, detall?: { notify?: string }) {
		super(message);
		this.name = "Student_id_Error";
		this.code = code;
		this.notify = detall.notify;
	}
}

export const id = {
	/**
	 * @desc สร้างรหัสนักศึกษาโดยใช้ค่าที่ให้มา
	 * @param {string | number} value - ค่าที่ใช้สร้างรหัสนักศึกษา
	 * @returns {string} - รหัสนักศึกษาที่สร้างขึ้น
	 * @throws {Student_id_Error}
	 */
	generate(value: string | number): string {
		if (typeof value === "number") {
			value = value.toString();
		}

		if (value.length === 3) {
			return `66143${value}`;
		} else if (value.length === 8 && value) {
			const pattern = /6614[35]/g;

			if (pattern.test(value)) {
				return value;
			}
		}

		throw new Student_id_Error("INVALID_STUDENT_ID_FORMAT", "รูปแบบรหัสนักศึกษาไม่ถูกต้อง", { notify: "กรุณาใส่รหัสนักศึกษาให้ถูกต้อง 66143420 หรือ 420" });
	},
};
