import Head from "next/head";

import CarouselComp from "@/components/swiper";

export default function index() {
	return (
		<div className="select-none">
			<Head>
				<title>CMRU COMSCI 66</title>
			</Head>
			<div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
				<div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
					<svg
						aria-hidden="true"
						className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
						viewBox="0 0 2024 2024"
					>
						<circle
							cx={512}
							cy={512}
							fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
							fillOpacity="0.7"
							r={512}
						/>
						<defs>
							<radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
								<stop stopColor="#7775D6" />
								<stop offset={1} stopColor="#E935C1" />
							</radialGradient>
						</defs>
					</svg>
					<div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
						<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
							Computer Science 66
							<br />
							Chiang Mai Rajabhat University
						</h2>
						<p
							className="mt-6 text-lg leading-8 text-gray-300"
							style={{ textIndent: "2em" }}
						>
							ยินดีต้อนรับเข้าสู่เว็บไซต์
							เว็บไซต์นี้สร้างขึ้นมาเพื่อเป็นแหล่งศูนย์รวมของนักศึกษา
							คณะวิทยาศาสตร์และเทคโนโลยี สาขา วิทยาการคอมพิวเตอร์ ทั้ง 2
							หมู่เรียน วค66.วท.บ.4.1 และ วค66.วท.บ.4.2
						</p>
					</div>
					<div className="relative mt-16 h-80 lg:mt-8">
						<div className="absolute-position absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10">
							<CarouselComp />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
