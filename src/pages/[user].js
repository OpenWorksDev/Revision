import { useRouter } from "next/router";

export async function getStaticProps() {
	return { notFound: true };
};

export async function getStaticPaths() {
	return {
		fallback: true,
		paths: []
	}
}

export default function GetUser() {
	const router = useRouter();
	const { user } = router.query;

	if (router.isFallback)
	{
		return <h1>Loading...</h1>;
	}

	return (
		<p>User: {user}</p>
	)
}