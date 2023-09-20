
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
	html += `</div>`
	return html;
}

function handleSearch(e) {
	e.preventDefault();

	// TODO
	// For Step 5, implement the rest of this function!
}

document.getElementById("search-btn").addEventListener("click", handleSearch);
