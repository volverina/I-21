//window.open("https://kdpu.edu.ua");
/*
window.document.body.style.background = "blue";
window.document.body.style.color = "yellow";
window.document.body.style.fontSize = "72";
alert(window.document);
console.log(window.document);
document.fullscreen = true;
*/
var elem = document.getElementById("second");
elem.style.background = "blue";
elem.style.color = "yellow";
elem.style.fontSize = "72";
var elements = document.getElementsByTagName("p");
for(var i = 0; i < elements.length; i++) {
	console.log(elements[i]);
	elements[i].style.fontSize = (i+1) * 5;
}

