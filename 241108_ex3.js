document.addEventListener("DOMContentLoaded", function() {
	/*
		<h1>title</h1>
		<p>Paragraph</p>
		<div>Divider</div>
	*/
	var h1 = document.createElement("h1");
	h1.innerHTML = "title";

	var p = document.createElement("p");
	p.innerHTML = "Paragraph";

	var div = document.createElement("div");
	div.innerHTML = "Divider";

	document.body.appendChild(h1);
	document.body.appendChild(p);
	document.body.appendChild(div);
	//alert("Now");
	
	function remover() {
		//document.body.removeChild(h1);
		document.body.removeChild(p);
		//document.body.removeChild(div);
	}
	
	setTimeout(remover, 5000);
});


