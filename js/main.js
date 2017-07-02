/**
 * Created by webicome on 2017/6/28.
 */
function main() {
    let container = document.querySelector(".container");
    let header = document.querySelector(".header");
    let nav = header.querySelector(".nav");
    let slide = document.querySelector(".slide");
    let point = document.querySelector(".slide-point");
    appendNavNodes(nav, createNavNodes(videos));
    let videoNodes = generateVideosArr(videos);
    let tabs = header.querySelectorAll("a");
    addTabsClickEvent(tabs, container, videoNodes);

    addSlideEvent(slide, point);
    // addNavTouchEvent(nav);
}

function addTabsClickEvent(tabs, container, videoNodes) {
    initVideoContent(container, videoNodes);
    for (let i = 0; i < tabs.length; i++) {
        let tab = tabs[i];
        tab.addEventListener("click", function () {
            tabs.forEach(function (tab, p2, p3) { tab.setAttribute("class", "") });
            tab.setAttribute("class", "active");
            appendVideos(container, videoNodes[i]);
        })

    }

    function initVideoContent(parent, videoNodes) {
        appendVideos(parent, videoNodes[0]);
    }
}

function appendNavNodes(parent, navNodes) {
    parent.innerHTML = navNodes;

}


function createNavNodes(videoContents) {
    return videoContents.map(function (videoContent, index) {
        return getNavNodes(videoContent, index);
    }).join('');

    function getNavNodes(videoContent, index) {
        return '<li><a title="' + videoContent.enName + '" class="' + ((index == 0) ? "active" : "") + '" href="#">' + videoContent.name + '<span class="line"></span></a></li>'
    }
}


function appendVideos(parent, videos) {
    parent.innerHTML = null;
    for (let i = 0; i < videos.length; i++) {
        parent.appendChild(videos[i]);
    }
}


function addNavTouchEvent(nav) {
    let width = nav.offsetWidth;
    let parentNodeWidth = nav.parentNode.offsetWidth;
    let startPos = 0;
    let endPos = 0;
    let moveLength = 0;

    nav.addEventListener("touchstart", function (event) {
        startPos = event.targetTouches[0].pageX;
    });

    nav.addEventListener("touchend", function (event) {
        endPos += moveLength;
        if (endPos >= 0 && parseInt(this.style.marginLeft) > 0) {
            endPos = 0;
        } else if (endPos < (parentNodeWidth - width)) {
            endPos = parentNodeWidth - width;
        }
        // this.style.marginRight = -endPos + "px";
        this.style.marginLeft = endPos + "px";

        startPos = 0;
        moveLength = 0;
    });

    nav.addEventListener("touchmove", function (event) {
        let touch = event.targetTouches[0];
        moveLength = touch.pageX - startPos;
        // this.style.marginRight = -(endPos + moveLength) + "px";
        this.style.marginLeft = (endPos + moveLength) + "px";

    })
}

function addSlideEvent(slide, point) {
    let slideContent = slide.querySelector(".slide-content");
    let points = point.querySelectorAll("span");
    let width = slide.offsetWidth;
    let startPos = 0;
    let endPos = width;
    let moveLength = 0;
    let timer = null;

    points[0].style.backgroundColor = "#ccc";

    slideContent.addEventListener("touchstart", function (event) {
        startPos = event.targetTouches[0].pageX;
    });

    slideContent.addEventListener("touchmove", function (event) {

        let touch = event.targetTouches[0];
        moveLength = touch.pageX - startPos;
        this.style.marginLeft = -endPos + moveLength + "px";
        this.style.marginRight = endPos - moveLength + "px";
        clearInterval(timer);
    });

    slideContent.addEventListener("touchend", function (event) {
        points[endPos / width - 1].style.backgroundColor = "#fff";

        if (parseInt(moveLength) < 0  && -parseInt(moveLength) > 0.3*width) {
            endPos += width;
        }
        if (parseInt(moveLength) > 0 && parseInt(moveLength) > 0.3*width) {
            endPos -=width;
        }
        if (endPos == 0) {
            endPos = points.length * width;
        }

        if (endPos == (points.length + 1) * width) {
            endPos = width;
        }
        points[endPos / width - 1].style.backgroundColor = "#ccc";

        this.style.marginLeft = -endPos + "px";
        this.style.marginRight = endPos + "px";

        startPos = 0;
        moveLength = 0;
        timer = setInterval(intervalHandle, 3000);

    });
    timer = setInterval(intervalHandle, 3000)

    function intervalHandle() {
        let count = 0;
        function move() {
            count = count + 20;
            slideContent.style.marginRight = endPos + count + "px";
            slideContent.style.marginLeft = -endPos - count + "px";
            if (count < width) {
                setTimeout(move, 20)
            } else {
                endPos += width;
                points[endPos / width - 2].style.backgroundColor = "#fff";
                if (endPos == (points.length + 1)*width) {
                    endPos = width;
                }
                points[endPos / width -1].style.backgroundColor = "#ccc";
                slideContent.style.marginLeft = -endPos + "px";
                slideContent.style.marginRight = endPos + "px";
            }
        }
        move();

    }
}

main();