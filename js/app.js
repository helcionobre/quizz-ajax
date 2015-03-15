$(document).ready(function() {	
	var questions = [{q: "H", a: "Hydrogen", 1: "Helium", 2: "Hydrogen", 3: "Silicon", 4: "Calcium"},
					 {q: "O", a: "Oxygen", 1: "Iron", 2: "Neon", 3: "Lithium", 4: "Oxygen"},
					 {q: "Na", a: "Sodium", 1: "Carbon", 2: "Neon", 3: "Sodium", 4: "Nitrogen"},
					 {q: "K", a: "Potassium", 1: "Potassium", 2: "Lead", 3: "Platinum", 4: "Lithium"},
					 {q: "Mg", a: "Magnesium", 1: "Titanium", 2: "Magnesium", 3: "Calcium", 4: "Nitrogen"},
					 {q: "Si", a: "Silicon", 1: "Platinum", 2: "Lead", 3: "Iron", 4: "Silicon"},
					 {q: "Cs", a: "Caesium", 1: "Caesium", 2: "Lithium", 3: "Titanium", 4: "Carbon"},
					 {q: "Cl", a: "Chlorine", 1: "Chlorine", 2: "Iron", 3: "Neon", 4: "Nitrogen"},
					 {q: "Pb", a: "Lead", 1: "Silicon", 2: "Gallium", 3: "Calcium", 4: "Lead"},
					 {q: "C", a: "Carbon", 1: "Carbon", 2: "Silver", 3: "Helium", 4: "Iron"}];

	var counter = 0;
	var rightAns = 0;
	var wrongAns = 0;

	function start() {
		counter = 0;
		rightAns = 0;
		wrongAns = 0;
		$(".icons").empty();
		document.getElementById("numbercor").innerHTML = rightAns;
		document.getElementById("numberinc").innerHTML = wrongAns;
		document.getElementById("element").innerHTML = questions[0]["q"];
		for (i = 1; i < 5; i++) {
			$(".itemList").append("<li><button class='options'>" + questions[0][i] + "</button></li>");		
		};
	};

	function listQuestions(j) {
		$(".itemList").empty();
		document.getElementById("element").innerHTML = questions[j]["q"];
		for (i = 1; i < 5; i++) {
			$(".itemList").append("<li><button class='options'>" + questions[j][i] + "</button></li>");
		};
	};

	function Compare(i, j) {
		if (i == j) {
			$(".icons").append("<li class='correct'><i class='fa fa-check-circle'></i></li>");
			rightAns++;
			document.getElementById("numbercor").innerHTML = rightAns;

			// Own lightbox
			$('.backdrop, .box').animate({'opacity':'.50'}, 300, 'linear');
			$('.box').animate({'opacity':'1.00'}, 300, 'linear');
			$('.backdrop, .box').css('display', 'block');
			getRequest(j);
		}
		else {
			$(".icons").append("<li class='wrong'><i class='fa fa-circle'></i></li>");	
			wrongAns++;
			document.getElementById("numberinc").innerHTML = wrongAns;
		}
	};

	function showResults(data) {
		$.modal("<div>" + data.values[0].value + "</div>");
	};

	function getRequest(searchTerm) {
		var our_value = searchTerm.toLowerCase();
		var topic_id = our_value;
		var params = {};
		url = 'https://www.googleapis.com/freebase/v1/topic/en/';
		$.getJSON(url + topic_id + '?filter=/common/topic/description', params, function(data) {
			myData = data.property["/common/topic/description"];
			showResults(myData);
		});
	};

  	$(".itemList").on("click", ".options", function() {
  		Compare(this.innerHTML, questions[counter]["a"]);
  		counter++;
  		if (counter >= questions.length) {
  			document.getElementById("nright").innerHTML = rightAns;
  			document.getElementById("nwrong").innerHTML = wrongAns;
  			overlayf();
  			start();
  		}
  		listQuestions(counter);
  	});

// Your own lightbox
 //  	$('.close').click(function(){
	// 	close_box();
	// });
 
	// $('.backdrop').click(function(){
	// 	close_box();
	// });
	
	// function close_box() {
	// 	$('.backdrop, .box').animate({'opacity':'0'}, 300, 'linear', function(){
	// 		$('.backdrop, .box').css('display', 'none');
	// 	});
	// }

  	start();

});

function overlayf() {
		el = document.getElementById("overlay");
		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
};
