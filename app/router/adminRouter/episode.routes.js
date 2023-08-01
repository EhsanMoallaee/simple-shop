const { Router } = require('express');
const { EpisodeController } = require('../../http/controllers/adminControllers/course/episode.controller');
const { videoUploader } = require('../../utils/multer/video.uploader');
const adminEpisodeRouter = Router();

adminEpisodeRouter.put('/add', [videoUploader.single('video')], EpisodeController.addEpisode);
adminEpisodeRouter.delete('/remove/:episodeId', EpisodeController.removeEpisode);
adminEpisodeRouter.patch('/update/:episodeId', [videoUploader.single('video')], EpisodeController.updateEpisode);

module.exports = {
    adminEpisodeRouter,
}