const {User} = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

//Validate the secret token
function jwtSignUser (user) {
	const ONE_WEEK = 60 * 60 * 24 * 7 ; 
	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn: ONE_WEEK
	});
}

module.exports = {
	async register (req, res) {
		try {
			const user = await User.create(req.body);
			res.send (user.toJSON());
		} catch (err) {
			res.status(400).send({
				error: "This email is already in use."
			});
		}
	},
	async login (req, res) {
		try {
			const {email, password} = req.body;
			//Try to find a user in the Database
			const user = await User.findOne({
				where: {
					email: email
				}
			});

			//If the user doesn't exist return an error
			if (!user) {
				return res.status(403).send({
					error: "The login information is incorrect"
				});
			}

			// Check if the password is valid
			const isPasswordValid = await user.comparePassword(password);
			if(!isPasswordValid) {
				return res.status(403).send({
					error: "The login information is incorrect"
				});
			}

			//Return the user if its valid
			const userJson = user.toJSON();
			res.send({
				user: userJson,
				token: jwtSignUser(userJson)
			});

		} catch (err) {
			res.status(500).send({
				error: "An error has ocurred trying to log in"
			});
		}
	}
};
