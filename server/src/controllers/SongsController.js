const {Song} = require("../models");

module.exports = {
	async index (req, res) {
		try {
			const song = await Song.findAll({
				limit: 10
			});
			res.send(song);
		} catch (err) {
			res.status(500).send({
				error: "Impossible to fetch the songs"
			});
		}
	},
	async post (req, res) {
		try {
			const song = await Song.create(req.body);
			res.send(song);
		} catch (err) {
			res.status(500).send({
				error: "An error ocurred trying to create a song"
			});
		}
	}
};