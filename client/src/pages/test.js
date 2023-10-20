import React, { useEffect, useState } from "react";

function MyComponent() {
	const [cooldown, setCooldown] = useState(0);
	const [isCooldown, setIsCooldown] = useState(false);

	useEffect(() => {
		let interval;

		if (isCooldown && cooldown > 0) {
			interval = setInterval(() => {
				setCooldown(cooldown - 1);
			}, 1000);
		} else if (cooldown === 0) {
			setIsCooldown(false);
		}

		return () => {
			clearInterval(interval);
		};
	}, [cooldown, isCooldown]);

	const startCooldown = (duration) => {
		setCooldown(duration);
		setIsCooldown(true);
	};

	// ฟังก์ชันที่จะเรียกเมื่อคลิกเพื่อเริ่ม cool down
	const handleStartCooldownClick = () => {
		startCooldown(60); // เริ่ม cool down 60 วินาที
	};

	return (
		<div>
			<div>Cool Down: {cooldown} วินาที</div>
			{isCooldown ? (
				<div>รออีก {cooldown} วินาทีก่อนสามารถส่งข้อมูลอีกครั้ง</div>
			) : (
				<button onClick={handleStartCooldownClick}>เริ่ม Cool Down</button>
			)}
		</div>
	);
}

export default MyComponent;
