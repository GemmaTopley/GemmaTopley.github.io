
// tabs //

function openTab(evt, tabName) {
    let j, tabContent, tabLinks;

    tabContent = document.getElementsByClassName("tabContent");
    for (j = 0; j < tabContent.length; j++){
        tabContent[j].style.display = "none";
    }

    tabLinks = document.getElementsByClassName("tabLinks");
    for (j = 0; j < tabLinks.length; j ++) {
        tabLinks[j].className = tabLinks[j].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
};

if(document.getElementById("degreeBtn")){
    document.getElementById("degreeBtn").addEventListener("click", function(event){
        openTab(event, 'degreeTab')
    })
};

if(document.getElementById("alevelBtn")){
    document.getElementById("alevelBtn").addEventListener("click", function(event){
        openTab(event, 'alevelTab')
    })
};

if(document.getElementById("gcseBtn")){
    document.getElementById("gcseBtn").addEventListener("click", function(event){
        openTab(event, 'gcseTab')
    })
};

const defaultTab = document.getElementById("degreeBtn");

if(defaultTab) {
    defaultTab.click();
}