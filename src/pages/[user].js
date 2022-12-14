import { useRouter } from "next/router";
import Error404 from "../components/Error404";

export default function GetUser() {
	const router = useRouter();
	const { user } = router.query;

	return (
		<Error404 />
	)
	// return <p>User: {user}</p>;
}