images = ["photo.png", "dot.png", "Screenshot from 2024-11-08 12-24-14.png"];
number = 0;

function clicked(evt) {
	number++;
	image.src = images[number%3];
	console.log(evt);
}


document.addEventListener("DOMContentLoaded", (evt) => {
	// here
	button = document.getElementById("b3");
	text = document.getElementById("text");
	image = document.getElementsByTagName("img")[0];
	console.log(evt);

	button.addEventListener("click", clicked);
});


window.addEventListener("mousedown", (evt) => {
	console.log(evt);
	text.innerHTML="X: " + evt.clientX + ", Y: " + evt.clientY;
});
