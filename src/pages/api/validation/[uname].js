export default function UnameCheck(req, res) {
	const { uname } = req.query;
	// TODO: Username Query Check
	// Query the database for usernames in use
	// Only return true if no one else has said username


	// Currently defaults to a used username thus not allowing call to register.js
	res.status(200).send({valid: false});
}