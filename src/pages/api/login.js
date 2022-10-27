import { hash, compare } from "../../components/authentication";
export default async function LoginAPIRoute(req, res) {
  let formData = JSON.parse(req.body);
  console.log(await hash(formData.passwd));

  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  res.status(200).end();
}
