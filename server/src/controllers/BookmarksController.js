const {Bookmark} = require("../models");

module.exports = {
	async index (req, res) {
		try {
			const {songId, userId} = req.query;
			const bookmark = await Bookmark.findOne({
				where: {
					SongId: songId,
					UserId: userId
				}
			}); 
			res.send(bookmark);
		} catch (err) {
			res.status(500).send({
				error: "Impossible to fetch the Bookmark"
			});
		}
	},
	async post (req, res) {
		try {
			const {SongId, UserId} = req.body;

			const bookmark = await Bookmark.findOne({
				where: {
					SongId: SongId,
					UserId: UserId
				}
			});

			if (bookmark) {
				return res.status(400).send({
					error: "You already have this set as a bookmark"
				});
			}

			const newBookmark = await Bookmark.create(req.body);
			res.send(newBookmark);
		} catch (err) {
			res.status(500).send({
				error: "Impossible to create the Bookmark"
			});
		}
	},
	async delete (req, res) {
		try {
			const {bookmarkId} = req.params;
			const bookmark = await Bookmark.findById(bookmarkId);
			await bookmark.destroy();
		} catch (err) {
			res.status(500).send({
				error: "Impossible to destroy the Bookmark"
			});
		}
	}
};