import { Spinner } from "@nextui-org/react";
import React from "react";

const Loading = ({ isError, isLoading }) => {
	if (isLoading) {
		return <Spinner label="กำลังโหลดข้อมูล.." size="sm" />;
	} else if (isError) {
		return (
			<Spinner
				color="danger"
				label="พบข้อผิดพลาด ไม่สามารถโหลดข้อมูลได้"
				size="sm"
			/>
		);
	}
};

export default Loading;
