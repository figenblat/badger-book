/**
 * Fetching the student data
 */

fetch("https://cs571.org/api/f23/hw2/students", {
	method: "GET",
	headers: {
	  "X-CS571-ID": CS571.getBadgerId()
	}
  })
  .then(response => response.json())
  .then(data => {
	console.log(data)
	document.getElementById("num-results").innerText = data.length;
	document.getElementById("students").innerHTML = buildStudentsHtml(data);
	
  })
  .catch(error => console.error(error)) // Print errors



/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 * 
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs) {
	return studs.map(stud => buildStudentHtml(stud)).join("\n");
}

/**
 * Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 * 
 * @param {*} stud 
 * @returns 
 */
function buildStudentHtml(stud) {
	let html = `<div>`;
	html += `<h2>${stud.name.first} ${stud.name.last}</h2>`;
	html += `</div>`;
	html += `<div>`;
	html += `<h5><strong><i>${stud.major}</i></strong></h5>`;
	html += `</div>`;
	if (stud.fromWisconsin == true){
		html += `<div>`;
		html += `<h6>${stud.name.first} is taking ${stud.numCredits} credits and is from Wisconsin</h6>`;
		html += `</div>`;
	}
	else{
		html += `<div>`;
		html += `<h6>${stud.name.first} is taking ${stud.numCredits} credits and is <strong><i> not </i></strong> from Wisconsin</h6>`;
		html += `</div>`;
	}

	html += `<div>`;
	html += `<h6>${stud.name.first} has a total of ${stud.interests.length} interests which include:</h6>`;
	html += `</div>`;
	html += `<div>`;
	html += `<ul>`;
	for(i = 0; i < stud.interests.length; i++){
		html += `<li> ${stud.interests[i]}</li>`;
	}
	html += `</div>`;

	return html;
}

function handleSearch(e) {
	e.preventDefault();

	// TODO
	// For Step 5, implement the rest of this function!
}

document.getElementById("search-btn").addEventListener("click", handleSearch);
