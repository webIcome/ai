/**
 * Created by webicome on 2017/6/28.
 */
function main() {
    appendNavNodes(createNavNodes(videos));
    let videoNodes = generateVideosArr(videos);
    processHeader(videoNodes);
    moveElement()
}

function processHeader(videoNodes) {
    let header = document.querySelector(".header");
    let tabs = header.querySelectorAll("a");
    init(tabs, videoNodes);
    for (let i = 0; i < tabs.length; i++) {
        let tab = tabs[i];
        tab.onclick = function () {
            for (let j = 0; j < tabs.length; j++) {
                tabs[j].setAttribute("class", '')
            }
            tab.setAttribute("class", "active");
            appendVideos(videoNodes[i]);
        }
    }

}

function init(tabs, videoNodes) {
    tabs[0].setAttribute("class", "active");
    appendVideos(videoNodes[0]);
}

function appendNavNodes(navNodes) {
    let header = document.querySelector(".header");
    let nav = header.querySelector(".nav");
    nav.innerHTML = navNodes;

}


function createNavNodes(videoContents) {
    return videoContents.map(function (videoContent) {
        return getNavNodes(videoContent);
    }).join('');

    function getNavNodes(videoContent) {
        return '<li><a title="' + videoContent.enName + '" class="" href="#">' + videoContent.name + '<span class="line"></span></a></li>'
    }
}



function appendVideos(videos) {
    let container = document.querySelector(".container");
    container.innerHTML = null;
    for (let i = 0; i < videos.length; i++) {
        container.appendChild(videos[i]);
    }
}


function moveElement() {
    let header = document.querySelector(".header");
    let nav = header.querySelector(".nav");
    let width = nav.style.width;
    let startPos;
    let endPos;
    nav.addEventListener("touchstart", function (event) {
        startPos = event.targetTouches[0].pageX;
    });

    nav.addEventListener("touchend", function (event) {
        if (endPos < 0 || (width - endPos) < document.body.clientWidth) {
            this.style.marginLeft = 0 + "px";
        }
    });
    nav.addEventListener("touchmove", function (event) {
        let touch = event.targetTouches[0];
        endPos = touch.pageX - startPos;
        this.style.marginLeft = endPos + "px";
    })
}

main();