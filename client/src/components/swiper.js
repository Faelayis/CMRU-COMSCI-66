import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CarouselComp() {
	return (
		<div>
			<Swiper
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				centeredSlides={false}
				modules={[Autoplay, Pagination, Navigation]}
				navigation={false}
				pagination={{
					clickable: false,
				}}
				spaceBetween={300}
			>
				<SwiperSlide>
					<Image
						alt="Slide1"
						height={1080}
						src="https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&h=1080&q=80"
						width={1824}
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						alt="Slide2"
						height={1080}
						src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&h=1080&q=80"
						width={1824}
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						alt="Slide3"
						height={1080}
						src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&h=1080&q=80"
						width={1824}
					/>
				</SwiperSlide>
			</Swiper>
		</div>
	);
}
