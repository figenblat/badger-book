
let searchArray = [];
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
	//console.log(data)
	document.getElementById("num-results").innerText = data.length;
	document.getElementById("students").className = "row";
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
	let html = `<div id =${stud.name.first}${stud.name.last} class = "col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">`;

	html += `<h2>${stud.name.first} ${stud.name.last}</h2>`;
	html += `<h5><strong><i>${stud.major}</i></strong></h5>`;
	if (stud.fromWisconsin == true){
		html += `<h6>${stud.name.first} is taking ${stud.numCredits} credits and is from Wisconsin</h6>`;
	}
	else{
		html += `<h6>${stud.name.first} is taking ${stud.numCredits} credits and is <strong><i> not </i></strong> from Wisconsin</h6>`;
	}
	html += `<h6>${stud.name.first} has a total of ${stud.interests.length} interests which include:</h6>`;
	html += `<ul>`;
	for(i = 0; i < stud.interests.length; i++){
		html += `<li> ${stud.interests[i]}</li>`;
	}
	html += `</div>`;
	
	return html;
}

/**
 * 
 * Updated handleSearch method 
 * fetches the data, as well as pulls the values from the search bar 
 * then loops through the data array and looks for objects that match the search criteria 
 * adding them to a new array, which is then sent to buildStudentsHTML 
 */

function handleSearch(e) {
	e.preventDefault();
	searchArray.splice(0, searchArray.length);

	//pulling the values from the search bars for name, major, and interest
	let searchName = document.getElementById("search-name").value;
	let searchMajor = document.getElementById("search-major").value;
	let searchInterest = document.getElementById("search-interest").value;

	let students = document.getElementById("students");

	//putting the searches in all lower case
	searchName = searchName.toLowerCase().trim();
	searchMajor = searchMajor.toLowerCase().trim();
	searchInterest = searchInterest.toLowerCase().trim();

	

	fetch("https://cs571.org/api/f23/hw2/students", {
	method: "GET",
	headers: {
	  "X-CS571-ID": CS571.getBadgerId()
	}
  })
  .then(response => response.json())
  .then(data => {
	console.log(data);

	for (let i = 0; i < data.length; i ++){

		// only searching by name
         if(searchName !== "" && searchMajor === "" && searchInterest === ""){
            if(data[i].name.first.toLowerCase().includes(searchName) || data[i].name.last.toLowerCase().includes(searchName)){
                searchArray.push(data[i]);
            }
        }

        // only searching by major
		else if(searchName === "" && searchMajor !== "" && searchInterest === "" ){
       	 	if(data[i].major.toLowerCase().includes(searchMajor)){
				searchArray.push(data[i]);
			}

    	}
    // only searching by interest
    	else if(searchName === "" && searchMajor === "" && searchInterest !== ""){
			for(let j = 0; j< data[i].interests.length; j++){
				if(data[i].interests[j].toLowerCase().includes(searchInterest)){
					searchArray.push(data[i]);
					break;
				}
			}
   	 	}
    // searching by name and major
    	else if(searchName !== "" && searchMajor !== "" && searchInterest === ""){
       	 	if(data[i].name.first.toLowerCase().includes(searchName) || data[i].name.last.toLowerCase().includes(searchName)){
				if(data[i].major.toLowerCase().includes(searchMajor)){
					searchArray.push(data[i]);
				}
			}
   		}
    // searching by name and interest 
   	 	else if(searchName !== "" && searchMajor === "" && searchInterest !== ""){
        	if(data[i].name.first.toLowerCase().includes(searchName) || data[i].name.last.toLowerCase().includes(searchName)){
				for(let j = 0; j< data[i].interests.length; j++){
					if(data[i].interests[j].toLowerCase().includes(searchInterest)){
						searchArray.push(data[i]);
						break;
					}
				}
    		}
		}
    // searching by major and interest
    	else if(searchName === "" && searchMajor !== "" && searchInterest !== ""){
       	 	if(data[i].major.toLowerCase().includes(searchMajor)){
				for(let j = 0; j< data[i].interests.length; j++){
					if(data[i].interests[j].toLowerCase().includes(searchInterest)){
						searchArray.push(data[i]);
						break;
					}
				}
    		}
		}
    // searching by name, major, and interest 
   	 	else if(searchName !== "" && searchMajor !== "" && searchInterest !== ""){
			if(data[i].name.first.toLowerCase().includes(searchName) || data[i].name.last.toLowerCase().includes(searchName)){
				if(data[i].major.toLowerCase().includes(searchMajor)){
					for(let j = 0; j< data[i].interests.length; j++){
						if(data[i].interests[j].toLowerCase().includes(searchInterest)){
							searchArray.push(data[i]);
							break;
						}
					}
				}
    		}
    	}
		else if(searchName === "" && searchMajor === "" && searchInterest === ""){
			searchArray.push(data[i]);
		}
	}
	console.log(searchArray);

	//updating the number of results
	document.getElementById("num-results").innerText = searchArray.length;
	document.getElementById("students").className = "row";
	document.getElementById("students").innerHTML = buildStudentsHtml(searchArray);


	
  })

}

document.getElementById("search-btn").addEventListener("click", handleSearch);
