let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function constructOptions(kButtonColors) {
	for (let item of kButtonColors) {
		let button = document.createElement('button');
		button.style.backgroundColor = item;
		button.addEventListener('click', function() {
			chrome.storage.sync.set({color: item}, function() {
				console.log('color is ' + item);
			})
		})
		page.appendChild(button);
	}
}

function createTime() {
	var day = document.getElementById('days').value;
	var timefrom = document.getElementById('timefrom').value;
	var timeto = document.getElementById('timeto').value;
	var jsonKey = day + "-" + timefrom

	for (let index = 0; index < 20000; index++) {
		console.log(jsonKey);
	}
	

	// chrome.storage.sync.set({
		
	// }, function() {
		
	// })
}

constructOptions(kButtonColors);
document.getElementById('week').onsubmit = createTime;