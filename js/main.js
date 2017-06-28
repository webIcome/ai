/**
 * Created by webicome on 2017/6/28.
 */
function main() {
    processHeader();
    addVideoBlocks(videos.videoContents);
}

function processHeader() {
    let header = document.querySelector(".header");
    let tabs = header.querySelectorAll("a");
    for (let i = 0; i < tabs.length; i++) {
        let tab = tabs[i];
        tab.onclick = function () {
            for (let j = 0; j < tabs.length; j++) {
                tabs[j].setAttribute("class", '')
            }
            tab.setAttribute("class", "active");
            addVideoBlocks(videos[tab.title]);
        }
    }

}

main();