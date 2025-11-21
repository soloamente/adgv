import { redirect } from "next/navigation";
import Dashboard from "./dashboard";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client";
import { Suspense } from "react";
import Loader from "@/components/loader";

async function DashboardContent() {
	const session = await authClient.getSession({
		fetchOptions: {
			headers: await headers(),
			throw: true,
		},
	});

	if (!session?.user) {
		redirect("/login");
	}

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome {session.user.name}</p>
			<Dashboard session={session} />
		</div>
	);
}

export default function DashboardPage() {
	return (
		<Suspense fallback={<Loader />}>
			<DashboardContent />
		</Suspense>
	);
}
