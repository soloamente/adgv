"use client";

import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import { Suspense, useState } from "react";
import Loader from "@/components/loader";

export default function LoginPage() {
	const [showSignIn, setShowSignIn] = useState(false);

	return (
		<Suspense fallback={<Loader />}>
			{showSignIn ? (
				<SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
			) : (
				<SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
			)}
		</Suspense>
	);
}
