const background = document.getElementById("background");
window.onscroll = function () {
	scrollFunction();
};

const ShowMoreButton = document.getElementById("showmore");
const InfoDatabase = document.getElementById("infodatabase");

RandomBackground();

const logs_list = document.getElementById("logs_list");

var dataJSON = {
	free: [
		{
			name: "style.css",
			path: "./data/style.css",
			type: "css",
			desc: "A stylesheet for sites",
		},
		{
			name: "memes-pt-br.json",
			path: "./data/memes-pt-br.json",
			type: "json",
			desc: "A Json for store image links",
		},
		{
			name: "scripts.js",
			path: "./data/scripts.js",
			type: "js",
			desc: "A script for sites",
		},
		{
			name: "Ez Cheat.js",
			path: "./data/ezCheat.js",
			type: "js",
			desc: "A cheat for a specific site",
		},
		{
			name: "PyMaxEngine",
			path: "https://github.com/MrJuaumBR/maxpygame",
			type: "py",
			desc: "A engine with PyGame",
		},
		{
			name: "colors.json",
			path: "./data/colors.json",
			type: "json",
			desc: "A json contains colors in RGB",
		},
		{
			name: "pyEncrypt.py",
			path: "./data/pyEncrypt.py",
			type: "py",
			desc: "A engine for encrypt texts, numbers and others.",
		},
		{"name":"allow-paste-bookmark","path":"./data/allow-paste-obf-bookmark.js","type":"js","desc":"A Cheat for a specific site"},
        {"name":"allow-paste-code","path":"./data/allow-paste-obf-code.js","type":"js","desc":"A Cheat for a specific site"}
	],
	logs: [
		{"date":"14/06/25 10:18","text":"2 New files added: 'allow-paste-bookmark' and 'allow-paste-code'"},
		{ date: "08/03/25 14:34", text: "Updated the Mainpage and mobile support." },
		{ date: "19/02/25 18:30", text: "Updated my mainpage." },
		{ date: "31/08/24 14:34", text: "Updated and moved PyMaxEngine." },
		{ date: "09/07/23 16:07", text: "Bugs fixeds, added pyEncrypt.py" },
		{
			date: "07/07/23 18:36",
			text: "Colors json, PyMaxEngine and deleted PooPEngine 2",
		},
		{
			date: "02/06/23 08:41",
			text: "Content updated, bug fixes and some improvements.",
		},
		{ date: "01/06/23 09:17", text: "memes page and new memes." },
		{
			date: "30/06/23 14:27",
			text: "some improvments to CSS and site title.",
		},
		{
			date: "29/06/23 15:00",
			text: "Some improvements in JavaScript and CSS and new function to Show Content button.",
		},
		{
			date: "26/06/23 21:25",
			text: "Some improvements in JavaScript and CSS and a new 'go to top' button",
		},
		{
			date: "26/06/23 21:08",
			text: "Added log System Logic, and functionalities",
		},
		{
			date: "26/06/23 17:47",
			text: "Added EzCheat.js, Added Log System and others...",
		},
	],
};

if (logs_list) {
	function getLogs() {
		var d = document.getElementById("logs_list");
		while (d.firstChild) {
			d.removeChild(d.firstChild);
		}
		var e = document.createElement("ol");
		var l = dataJSON["logs"];
		for (i = 0; i < l.length; i++) {
			var obj = l[i];
			var x = document.createElement("li");
			var s = document.createElement("small");
			x.innerText = obj["date"];
			s.innerText = " - " + obj["text"];
			x.appendChild(s);
			e.appendChild(x);
		}
		d.appendChild(e);
	}

	getLogs();
}
if (document.getElementById("cnt_list")) {
	getFiles();
}

function RandomBackground() {
	var Quantity = Math.random() * 100;

	for (var i = 0; i < Quantity; i++) {
		var x = Math.random() * 100;
		var y = Math.random() * 100;
		var deg = Math.random() * 360;

		var width = Math.random() * 45;
		var height = Math.random() * 45;

		var e = document.createElement("div");
		e.style.left = x + "%";
		e.style.top = y + "%";
		e.style.rotate = deg + "deg";

		e.style.width = width + "px";
		e.style.height = height + "px";
		e.style.backgroundColor = `rgba(${Math.random() * 255}, ${
			Math.random() * 255
		}, ${Math.random() * 255}, ${Math.random()})`;

		e.classList.add("bg-item");

		background.appendChild(e);
	}
}

if (ShowMoreButton && InfoDatabase) {
	ShowMoreButton.addEventListener("click", function () {
		if (InfoDatabase.hidden) {
			InfoDatabase.hidden = false;
			ShowMoreButton.textContent = "Hide";
		} else {
			InfoDatabase.hidden = true;
			ShowMoreButton.textContent = "Show";
		}
	});
}

function scrollFunction() {
	if (
		document.body.scrollTop > 20 ||
		document.documentElement.scrollTop > 20
	) {
		document.getElementById("scroll-to-top").style.display = "block";
	} else {
		document.getElementById("scroll-to-top").style.display = "none";
	}
}

function scrollToTop() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function SwitchHidden(id) {
	var d = document.getElementById(id);
	if (d) {
		if (d.hidden) {
			d.hidden = false;
		} else {
			d.hidden = true;
		}
	}
}

function OverlayOpen(id) {
	var d = document.getElementById(id);
	if (d.style.display == "none") {
		d.style.display = "block";
		if (id == "cnt") {
			getFiles();
		} else if (id == "meme") {
			GetMemes();
		}
	} else {
		if (d.style.display == "block") {
			d.style.display = "none";
		} else {
			d.style.display = "none";
		}
	}
}

window.addEventListener("click", (event) => {
	var over = document.getElementsByClassName("overlay");
	for (i = 0; i < over.length; i++) {
		var x = over[i];
		if (event.target === x) {
			x.style.display = "none";
		}
	}
});

function getFiles() {
	var e = document.getElementById("cnt_list");
	while (e.firstChild) {
		e.removeChild(e.firstChild);
	}

	var l = dataJSON["free"];
	/*/ 
        var x = document.createElement("li");
        x.innerText = element['memes-pt-br.json'];
        e.appendChild(x);
    /*/
	for (var i = 0; i < l.length; i++) {
		var obj = l[i];
		var x = document.createElement("li");
		var a = document.createElement("button");
		a.style.background = "none";
		a.className = "c-green";
		a.classList.add("button");
		a.innerText = obj["name"];
		a.Value = i;
		a.id = "item-" + i;
		x.appendChild(a);
		e.appendChild(x);
	}

	var childs = e.childNodes;
	childs.forEach(function (item) {
		var val = item.firstChild.id.split("-")[1];
		item.addEventListener("click", function () {
			GetClickedSpan(val);
		});
	});
}
function GetClickedSpan(me) {
	// Get JSON File
	var free = dataJSON["free"][me];

	// Get Frame of item
	var iteminfo = document.getElementById("item-info");

	var title = document.getElementById("item-title");
	var link = document.getElementById("item-link");
	var id = document.getElementById("item-id");
	var desc = document.getElementById("item-desc");

	// Set Div values
	title.textContent = "Title: " + free["name"];
	link.href = free["path"];
	desc.textContent = "Description: " + free["desc"];
	id.textContent = "ID: " + me + " Type: " + free["type"];

	// Show or hide
	if (iteminfo.hidden || me) {
		iteminfo.hidden = false;
	} else {
		iteminfo.hidden = true;
	}
}

function GetMemes() {
	var meme = "";
	var memesJson;
	fetch("./data/memes-pt-br.json")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			memesJson = data;
			meme = memesJson[Math.floor(Math.random() * memesJson.length)];
			var img = document.getElementById("meme-img");
			img.src = meme;
		});
}

const binaryCode = document.querySelector(".binary-code");

for (let i = 0; i < 20; i++) {
	const span = document.createElement("span");
	span.textContent = Array(8)
		.fill(0)
		.map(() => (Math.random() < 0.5 ? "0" : "1"))
		.join(" ");
	span.style.top = `${Math.random() * 100}%`;
	span.style.left = `${Math.random() * 100}%`;
	binaryCode.appendChild(span);
}

(function () {
	var width,
		height,
		largeContainer,
		canvas,
		ctx,
		circles,
		target,
		animateHeader = true;

	// Main
	initHeader();
	addListeners();

	function initHeader() {
		width = window.innerWidth;
		height = window.innerHeight;
		target = { x: 0, y: height };

		largeContainer = document.getElementById("co");
		largeContainer.style.height = height + "px";

		canvas = document.getElementById("c");
		canvas.width = width;
		canvas.height = height;
		ctx = canvas.getContext("2d");

		// create particles
		circles = [];
		for (var x = 0; x < width * 0.5; x++) {
			var c = new Circle();
			circles.push(c);
		}
		animate();
	}

	// Event handling
	function addListeners() {
		window.addEventListener("scroll", scrollCheck);
		window.addEventListener("resize", resize);
	}

	function scrollCheck() {
		if (document.body.scrollTop > height) animateHeader = false;
		else animateHeader = true;
	}

	function resize() {
		width = window.innerWidth;
		height = window.innerHeight;
		largeContainer.style.height = height + "px";
		canvas.width = width;
		canvas.height = height;
	}

	function animate() {
		if (animateHeader) {
			ctx.clearRect(0, 0, width, height);
			for (var i in circles) {
				circles[i].draw();
			}
		}
		requestAnimationFrame(animate);
	}

	// Canvas manipulation
	function Circle() {
		var _this = this;

		// constructor
		(function () {
			_this.pos = {};
			init();
			console.log(_this);
		})();

		function init() {
			_this.pos.x = Math.random() * width;
			_this.pos.y = height + Math.random() * 100;
			_this.alpha = 0.1 + Math.random() * 0.3;
			_this.scale = 0.1 + Math.random() * 0.3;
			_this.velocity = Math.random();
		}

		this.draw = function () {
			if (_this.alpha <= 0) {
				init();
			}
			_this.pos.y -= _this.velocity;
			_this.alpha -= 0.0005;
			ctx.beginPath();
			ctx.arc(
				_this.pos.x,
				_this.pos.y,
				_this.scale * 10,
				0,
				2 * Math.PI,
				false
			);
			ctx.fillStyle = "rgba(255,255,255," + _this.alpha + ")";
			ctx.fill();
		};
	}
})();
