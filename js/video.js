/**
 * Created by webicome on 2017/6/28.
 */
/**
 * Created by webicome on 2017/6/28.
 */
function generateVideosArr(videoContents) {

    return videoContents.map(function (video) {
        return createVideosNodes(video.contents);
    });

    function createVideosNodes(videoContents) {

        let videos = [];

        for (let index in videoContents) {
            let videoContent = videoContents[index];
            let videoBox = document.createElement("div");
            let video = document.createElement("video");
            let title = document.createElement("div");
            let description = document.createElement("div");
            videoBox.appendChild(video);
            videoBox.appendChild(title);
            videoBox.appendChild(description);
            videoBox.setAttribute("class", "video");
            video.setAttribute("width", "100%");
            video.setAttribute("controls", "controls");
            video.setAttribute("src", videoContent.src);
            video.setAttribute("poster", videoContent.poster);
            video.setAttribute("preload", "none");
            title.setAttribute("class", "title");
            title.setAttribute("title", videoContent.title);
            title.appendChild(document.createTextNode(videoContent.title));
            description.setAttribute("class", "description");
            description.setAttribute("title", videoContent.description);
            description.appendChild(document.createTextNode(videoContent.description));
            videos.push(videoBox);
        }

        return videos;
    }
}

