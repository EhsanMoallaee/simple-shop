const { secondsToTimeFormat } = require("../secondsToTimeFormat");

function calculateCourseTime(chapters = []) {
    let time = [];
    let seconds = 0;
    if(Array.isArray(chapters) && chapters.length > 0) {
        for(const chapter of chapters) {
            if(Array.isArray(chapter.episodes) && chapter.episodes.length > 0) {
                for(const episode of chapter.episodes) {
                    if(episode?.time && typeof episode.time == 'string') time = episode.time.split(':');
                    else time = [] //['00', '00', '00'];
                    if(time.length === 3) {
                        seconds += Number(time[0]) * 3600
                        seconds += Number(time[1]) * 60
                        seconds += Number(time[2]) 
                    } else if(time.length === 2) {
                        seconds += Number(time[0]) * 60
                        seconds += Number(time[1]) 
                    }
                }
            }
        }
        return secondsToTimeFormat(seconds);
    }
    return '00:00:00';
}

module.exports = {
    calculateCourseTime
}