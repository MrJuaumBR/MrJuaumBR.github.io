function tabChange(event, tabName) {
    var i, tabcontent, tablinks, trigger;
    trigger = event.target;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        if (trigger.dataset.group == tabcontent[i].dataset.group){
            tabcontent[i].style.display = "none";
        }
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}