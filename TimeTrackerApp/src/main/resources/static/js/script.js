window.addEventListener("load", function(e) {
	console.log("Script.js Loaded");
	init();
})

function init() {
	var startTime
	var startISO
	var stopTime
	var stopISO

	createListeners();
	loadTasks();
}

function createListeners() {
	document.createJobForm.submitCreateJob.addEventListener('click', createJob)
	document.createTaskForm.submitCreateTask.addEventListener('click', createTask)
	document.createTimerForm.startTimer.addEventListener('click', function(e) {
		e.preventDefault();
		startTime = Date.now();
		startISO = new Date().toISOString();
		document.getElementById("startTimer").setAttribute("disabled", "");
		document.getElementById("stopTimer").removeAttribute("disabled", "");
		document.getElementById("submitTime").setAttribute("disabled", "");
		console.log(startTime);
	})
	document.createTimerForm.stopTimer.addEventListener('click', function(e) {
		e.preventDefault();
		stopTime = Date.now();
		stopISO = new Date().toISOString();
		document.getElementById("startTimer").removeAttribute("disabled", "");
		document.getElementById("stopTimer").setAttribute("disabled", "");
		document.getElementById("submitTime").removeAttribute("disabled", "");
		console.log(stopTime);
	})
	document.createTimerForm.submitTime.addEventListener('click', createTimer)
}

///////////////////// GET JOBS ////////////////////////////////////////////////////////////

function loadJobs() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/jobs');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let jobs = JSON.parse(xhr.responseText);
				console.log(jobs);
			}
		}
	};
	xhr.send();
}

function loadJobById(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/jobs/${id}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let job = JSON.parse(xhr.responseText);
				return job;
			}
			else if (xhr.status === 404) {
				let job = [`No job found for ID# ${id}`]
			}
		}
	};
	xhr.send();
}

function loadJobsByCustomerSearch(keyword) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/jobs/search/customer/${keyword}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let jobs = JSON.parse(xhr.responseText);
				console.log(jobs);
			}
		}
	};
	xhr.send();
}

function loadJobsByJobNumberSearch(keyword) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/jobs/search/jobnumber/${keyword}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let jobs = JSON.parse(xhr.responseText);
				console.log(jobs);
			}
		}
	};
	xhr.send();
}

///////////////////// GET TASKS //////////////////////////////////////////////////////////

function loadTasks() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/tasks');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let tasks = JSON.parse(xhr.responseText);
				console.log(tasks);
			}
		}
	};
	xhr.send();
}

function loadTaskById(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/tasks/${id}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let task = JSON.parse(xhr.responseText);
				console.log(task);
			}
			else if (xhr.status === 404) {
				let task = [`No task found for ID# ${id}`]
				console.log(task);
			}
		}
	};
	xhr.send();
}

function loadTasksByJobId(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/tasks/search/job/${id}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let tasks = JSON.parse(xhr.responseText);
				console.log(tasks);
			}
		}
	};
	xhr.send();
}

///////////////////// GET TIMERS //////////////////////////////////////////////////////////

function loadTimers() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/timers');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let timers = JSON.parse(xhr.responseText);
				console.log(timers);
			}
		}
	};
	xhr.send();
}

function loadTimerById(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/timers/${id}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let timer = JSON.parse(xhr.responseText);
				console.log(timer);
			}
			else if (xhr.status === 404) {
				let timer = [`No timer found for ID# ${id}`]
				console.log(timer);
			}
		}
	};
	xhr.send();
}

function loadTimersByTaskId(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/timers/search/task/${id}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let timers = JSON.parse(xhr.responseText);
				console.log(timers);
			}
		}
	};
	xhr.send();
}

///////////////////// CREATE //////////////////////////////////////////////////////////

function createJob(e) {
	e.preventDefault();
	let form = e.target.parentElement;
	let job = { "jobNumber": form.jobNumber.value, "customer": form.customer.value }
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/jobs', true);
	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				let jobResult = JSON.parse(xhr.responseText);
				console.log(jobResult);
			}
			else if (xhr.status === 400) {
				let jobResult = ["400 - Bad Request"]
				console.log(jobResult);
			}
		}
	};
	xhr.send(JSON.stringify(job));

	// clear the input data
	form.reset()
}

function createTask(e) {
	e.preventDefault();
	let form = e.target.parentElement;
	let task = { "title": form.title.value, "description": form.description.value, "job": { "id": form.jobId.value } }
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/tasks', true);
	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				let taskResult = JSON.parse(xhr.responseText);
				console.log(taskResult);
			}
			else if (xhr.status === 400) {
				let taskResult = ["400 - Bad Request"]
				console.log(taskResult);
			}
		}
	};
	xhr.send(JSON.stringify(task));

	// clear the input data
	form.reset()
}

function createTimer(e) {
	e.preventDefault();
	let durationMinutes = (stopTime - startTime) / 1000 / 60;
	let hours = durationMinutes / 60;
	let minutes = durationMinutes - (hours * 60);
	let form = e.target.parentElement;
	let timer = { "start": startISO, "end": stopISO, "duration": durationMinutes, "task": {"id": form.taskId.value} }
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/timers', true);
	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				let timerResult = JSON.parse(xhr.responseText);
				console.log(timerResult);
			}
			else if (xhr.status === 400) {
				let timerResult = ["400 - Bad Request"]
				console.log(timerResult);
			}
		}
	};
	console.log(JSON.stringify(timer))
	xhr.send(JSON.stringify(timer));

	// clear the input data
	form.reset()
}