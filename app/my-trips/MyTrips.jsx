"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/app/utils/Loading";
import mapping from "@/app/data.json";

const MyTrips = () => {
	const [myTrips, setMyTrips] = useState(null);
	const router = useRouter();

	const getDetails = async () => {
		const res = await fetch("/api/find", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
			const json = await res.json();
			setMyTrips(json.trips);
		} else {
			const json = await res.json();
			alert(json.message);
			router.push("/");
		}
	};

	useEffect(() => {
		getDetails();
	}, []);

	const handleSearch = (id) => {
		router.push(`/trip/${id}`);
	};

	return myTrips ? (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<div className="card shadow-lg p-4">
						<h2 className="text-center mb-4">My Trips</h2>
						{myTrips.length > 0 ? (
							<table className="table-auto mt-3 text-center">
								<thead>
									<tr>
										<th>Trip ID</th>
										<th>Source</th>
										<th>Destination</th>
										<th>Date</th>
										<th>Time</th>
									</tr>
								</thead>
								<tbody>
									{myTrips.map((trip, idx) => (
										<tr
											key={idx}
											onClick={() =>
												handleSearch(trip.tripID)
											}
											className="cursor-pointer hover:bg-gray-100 transition"
										>
											<td>{trip.tripID}</td>
											<td>{trip.source}</td>
											<td>{trip.destination}</td>
											<td>{trip.date}</td>
											<td>{mapping.slots[trip.time]}</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p>No trips found</p>
						)}
						<Link href="/create">
							<button className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
								Enter New Trip Details
							</button>
						</Link>
						<Link href="/">
							<button className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
								Back to Home
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	) : (
		<Loading />
	);
};

export default MyTrips;