const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcrypt-nodejs"));

//Utility function hash the password.
/* eslint-disable no-unused-vars */
function hashPassword (user, options) {
	const SALT_FACTOR = 8;

	if(!user.changed("password")) {
		return;
	}

	return bcrypt
		.genSaltAsync(SALT_FACTOR)
		.then(salt => bcrypt.hashAsync(user.password, salt, null))
		.then(hash => {
			user.setDataValue("password", hash);
		});
}
/* eslint-enable no-unused-vars */

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		email: {
			type: DataTypes.STRING,
			unique: true
		},
		password: DataTypes.STRING
	}, {
		hooks: {
			beforeSave: hashPassword
		}
	});

	// Compare sent password to the models password
	User.prototype.comparePassword = function (password) {
		return bcrypt.compareAsync(password, this.password);
	};
	

	return User;
};
