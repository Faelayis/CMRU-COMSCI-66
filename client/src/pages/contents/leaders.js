import { faFacebookF, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Image } from "@nextui-org/react";
import Head from "next/head";
import Link from "next/link";

export default function Leader() {
	const leadersData = [
		{
			avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
			facebookLink: "https://www.facebook.com/johndoe",
			githubLink: "https://github.com/johndoe",
			name: "John Doe",
			role: "Software Engineer",
			sharp: '"Never give up"',
		},
		{
			avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
			facebookLink: "https://www.facebook.com/janesmith",
			githubLink: "https://github.com/janesmith",
			name: "Jane Smith",
			role: "Product Manager",
			sharp: '"Never give up"',
		},
		{
			avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
			facebookLink: "https://www.facebook.com/johndoe",
			githubLink: "https://github.com/johndoe",
			name: "John Doe",
			role: "Software Engineer",
			sharp: '"Never give up"',
		},
		{
			avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
			facebookLink: "https://www.facebook.com/janesmith",
			githubLink: "https://github.com/janesmith",
			name: "Jane Smith",
			role: "Product Manager",
			sharp: '"Never give up"',
		},
		{
			avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
			facebookLink: "https://www.facebook.com/johndoe",
			githubLink: "https://github.com/johndoe",
			name: "John Doe",
			role: "Software Engineer",
			sharp: '"Never give up"',
		},
		{
			avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
			facebookLink: "https://www.facebook.com/janesmith",
			githubLink: "https://github.com/janesmith",
			name: "Jane Smith",
			role: "Product Manager",
			sharp: '"Never give up"',
		},
		{
			avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
			facebookLink: "https://www.facebook.com/johndoe",
			githubLink: "https://github.com/johndoe",
			name: "John Doe",
			role: "Software Engineer",
			sharp: '"Never give up"',
		},
	];

	const SecterleadersData = [
		{
			avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
			facebookLink: "https://www.facebook.com/johndoe",
			githubLink: "https://github.com/johndoe",
			name: "John Doe",
			role: "Software Engineer",
			sharp: '"Never give up"',
		},
		{
			avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
			facebookLink: "https://www.facebook.com/janesmith",
			githubLink: "https://github.com/janesmith",
			name: "Jane Smith",
			role: "Product Manager",
			sharp: '"Never give up"',
		},
	];

	const DeveloperData = [
		{
			avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
			facebookLink: "https://www.facebook.com/johndoe",
			githubLink: "https://github.com/Faelayis",
			name: "Faelayis",
			role: "Fullstack Devpeloper",
			sharp: '"Never give up"',
		},
		{
			avatar: "https://i.pravatar.cc/150?u=a04258114e29026708c",
			facebookLink: "https://www.facebook.com/janesmith",
			githubLink: "https://github.com/zismaildev",
			name: "Zismil",
			role: "Fullstack Devpeloper",
			sharp: '"Never give up"',
		},
		{
			avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
			facebookLink: "https://www.facebook.com/janesmith",
			githubLink: "https://github.com/janesmith",
			name: "Nin",
			role: "UX|UI Devpeloper",
			sharp: '"Never give up"',
		},
		{
			avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
			facebookLink: "https://www.facebook.com/janesmith",
			githubLink: "https://github.com/janesmith",
			name: "Guy",
			role: "Contents",
			sharp: '"Never give up"',
		},
	];

	return (
		<div>
			<Head>
				<title>7 Leaders</title>
			</Head>
			<div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
				<Card>
					<div className="px-8 py-6">
						<h1 className="mb-4 text-2xl font-bold">7 Leader</h1>
						<p className="mb-8 text-gray-500">7 ผู้นำ วิทยาการคอมพิวเตอร์ 66</p>
						<div className="grid grid-cols-3 gap-8">
							{leadersData.map((leader, index) => (
								<div
									className="flex space-x-4 rounded-md bg-gray-100 p-4"
									key={index}
								>
									<Image
										alt={leader.name}
										className="size-16 rounded-full"
										src={leader.avatar}
									/>
									<div className="grow">
										<h3 className="text-lg font-semibold">{leader.name}</h3>
										<p className="text-gray-500">{leader.role}</p>
										<p className="text-gray-500">{leader.sharp}</p>
									</div>
									<div className="flex items-center space-x-2">
										<Link
											className="text-black hover:text-red-500"
											href={leader.facebookLink}
											pnpm
											target="_blank"
										>
											<FontAwesomeIcon className="size-4" icon={faFacebookF} />
										</Link>
										<Link
											className="text-black hover:text-red-500"
											href={leader.githubLink}
											target="_blank"
										>
											<FontAwesomeIcon className="size-4" icon={faGithub} />
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
					{/** Leader Secter */}
					<div className="px-8 py-6">
						<h1 className="mb-4 text-2xl font-bold">Section Leader</h1>
						<p className="mb-8 text-gray-500">หัวหน้าหมู่เรียน</p>
						<div className="grid grid-cols-3 gap-8">
							{SecterleadersData.map((leader, index) => (
								<div
									className="flex space-x-4 rounded-md bg-gray-100 p-4"
									key={index}
								>
									<Image
										alt={leader.name}
										className="size-16 rounded-full"
										src={leader.avatar}
									/>
									<div className="grow">
										<h3 className="text-lg font-semibold">{leader.name}</h3>
										<p className="text-gray-500">{leader.role}</p>
										<p className="text-gray-500">{leader.sharp}</p>
									</div>
									<div className="flex items-center space-x-2">
										<Link
											className="text-black hover:text-red-500"
											href={leader.facebookLink}
											target="_blank"
										>
											<FontAwesomeIcon className="size-4" icon={faFacebookF} />
										</Link>
										<Link
											className="text-black hover:text-red-500"
											href={leader.githubLink}
											target="_blank"
										>
											<FontAwesomeIcon className="size-4" icon={faGithub} />
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
					{/** Developer */}
					<div className="px-8 py-6">
						<h1 className="mb-4 text-2xl font-bold">Section Leader</h1>
						<p className="mb-8 text-gray-500">หัวหน้าหมู่เรียน</p>
						<div className="grid grid-cols-3 gap-8">
							{DeveloperData.map((leader, index) => (
								<div
									className="flex space-x-4 rounded-md bg-gray-100 p-4"
									key={index}
								>
									<Image
										alt={leader.name}
										className="size-16 rounded-full"
										src={leader.avatar}
									/>
									<div className="grow">
										<h3 className="text-lg font-semibold">{leader.name}</h3>
										<p className="text-gray-500">{leader.role}</p>
										<p className="text-gray-500">{leader.sharp}</p>
									</div>
									<div className="flex items-center space-x-2">
										<Link
											className="text-black hover:text-red-500"
											href={leader.facebookLink}
											rel="noreferrer"
											target="_blank"
										>
											<FontAwesomeIcon className="size-4" icon={faFacebookF} />
										</Link>
										<Link
											className="text-black hover:text-red-500"
											href={leader.githubLink}
											rel="noreferrer"
											target="_blank"
										>
											<FontAwesomeIcon className="size-4" icon={faGithub} />
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
