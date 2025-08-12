var dataJSON = {
    "free":[
        {"name":"style.css","path":"/data/style.css","type":"css","desc":"A stylesheet for sites"},
        {"name":"memes-pt-br.json","path":"/data/memes-pt-br.json","type":"json","desc":"A Json for store image links"},
        {"name":"scripts.js","path":"/data/scripts.js","type":"js","desc":"A script for sites"},
        {"name":"Ez Cheat.js","path":"/data/ezCheat.js","type":"js","desc":"A cheat for a specific site"},
        {"name":"PyMaxEngine","path":"/data/PyMaxEngine.py","type":"py","desc":"A engine with PyGame"},
        {"name":"colors.json","path":"/data/colors.json","type":"json","desc":"A json contains colors in RGB"},
        {"name":"pyEncrypt.py","path":"/data/pyEncrypt.py","type":"py","desc":"A engine for encrypt texts, numbers and others."},
        {"name":"abyssal eclipse news","path":"/data/news-abyssaleclipse.json","desc":"The news json that gonna be used by abyssal eclipse"},
    ],
    "logs":[
        {"date":"30/09/24 14:34","text":"Updated thw Database and Mainpage."},
        {"date":"31/08/24 14:34","text":"Updated and moved PyMaxEngine."},
        {"date":"09/07/23 16:07","text":"Bugs fixeds, added pyEncrypt.py"},
        {"date":"07/07/23 18:36","text":"Colors json, PyMaxEngine and deleted PooPEngine 2"},
        {"date":"02/06/23 08:41","text":"Content updated, bug fixes and some improvements."},
        {"date":'01/06/23 09:17','text':"memes page and new memes."},
        {"date":"30/06/23 14:27","text":"some improvments to CSS and site title."},
        {"date":"29/06/23 15:00","text":"Some improvements in JavaScript and CSS and new function to Show Content button."},
        {"date":"26/06/23 21:25","text":"Some improvements in JavaScript and CSS and a new 'go to top' button"},
        {"date":"26/06/23 21:08","text":"Added log System Logic, and functionalities"},
        {"date":"26/06/23 17:47","text":"Added EzCheat.js, Added Log System and others..."}
    ]
}

function GetMemes(){
    var meme = "";
    var memesJson;
    fetch("./data/memes-pt-br.json").then(response => {return response.json()}).then((data) => {
        memesJson = data;
        meme = memesJson[Math.floor(Math.random()*memesJson.length)];
        var img = document.getElementById("meme-img");
        img.src=meme;    
    });
}

function GetClickedSpan(me){
    // Get JSON File
    var free = dataJSON["free"][me];
    
    // Get Frame of item
    var iteminfo = document.getElementById("item-info");;
    
    var title = document.getElementById("item-title");
    var link = document.getElementById("item-link");
    var id = document.getElementById('item-id');
    var desc = document.getElementById('item-desc');

    // Set Div values
    title.textContent = "Title: " +free["name"];
    link.href= free["path"];
    desc.textContent = "Description: " + free["desc"];
    id.textContent = "ID: "+me + " Type: " + free["type"];

    // Show or hide
    if (iteminfo.hidden || me){
        iteminfo.hidden = false;
    }
    else{
        iteminfo.hidden = true;
    }
}

function getFiles(){
    var e =document.getElementById("cnt_list");
    while (e.firstChild) {
        e.removeChild(e.firstChild);
    }

    var l = dataJSON["free"]
    /*/ 
        var x = document.createElement("li");
        x.innerText = element['memes-pt-br.json'];
        e.appendChild(x);
    /*/
    for (var i =0;i< l.length; i++){
        var obj = l[i];
        var x = document.createElement("li");
        var a = document.createElement("button");
        a.style.background = "none";
        a.className = "c-green";
        a.innerText = obj["name"];
        a.Value = i;
        a.id = "item-"+i;
        x.appendChild(a);
        e.appendChild(x);

    }
    
    var childs = e.childNodes;
    childs.forEach(function(item){
        var val = item.firstChild.id.split('-')[1];
        item.addEventListener('click',function(){
            GetClickedSpan(val);
        });
    })
}

function getLogs(){
    var d = document.getElementById("logs_list");
    while (d.firstChild){
        d.removeChild(d.firstChild);
    }
    var e = document.createElement("ol");
    var l = dataJSON["logs"];
    for (i=0;i<l.length;i++){
        var obj = l[i];
        var x = document.createElement("li");
        var s = document.createElement("small");
        x.innerText = obj['date']
        s.innerText = " - "+obj["text"]
        x.appendChild(s)
        e.appendChild(x)
    }
    d.appendChild(e);
}

function showOrHide(id){
    var d = document.getElementById(id);
    if (d.hidden){
        d.hidden = false;
        if(id == "logs"){
            getLogs();
        };
    }
    else{
        d.hidden = true;
    }
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scroll-to-top").style.display = "block";
  } else {
    document.getElementById("scroll-to-top").style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function OverlayOpen(id){
    var d = document.getElementById(id);
    if (d.style.display=="none"){
        d.style.display = "block";
        if (id=="cnt"){
            getFiles();
        }
        else if(id =="meme"){
            GetMemes();
        }
    }
    else{
        if (d.style.display=="block"){
            d.style.display = "none";
        }
        else{
            d.style.display = "none"
        };
    };
    
}


window.addEventListener('click',(event)=>{
    var over = document.getElementsByClassName('overlay');
    for (i = 0; i <over.length; i++){
        var x = over[i];
        if (event.target === x){
            x.style.display = 'none';
        };
    }
})

document.addEventListener('load',function(){
    console.log('Wait, if you paste any thing here\nthis can damage the client-side site\nand open secure failures to client!\nOnly use this when you know what you are making.')
})
