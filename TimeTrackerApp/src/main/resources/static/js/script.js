window.addEventListener("load", function(e) {
	console.log("Script.js Loaded");
	init();
})

function init() {
	var startTime
	var startISO
	var stopTime
	var stopISO
	var selectedJobId
	var selectedJobNum
	var selectedTaskId
	var selectedTaskTitle
	var selectedTimerId
	var currentTimerStart
	var currentTimerStartISO
	var currentTimerEnd
	var currentTimerEndISO
	var currentTimerDuration

	createListeners();
	loadTasks();
}

function createListeners() {
	document.findJobsForm.searchJobsBtn.addEventListener('click', searchJobs)
	document.findJobsForm.viewJobs.addEventListener('click', loadJobs)
	document.findJobsForm.createJob.addEventListener('click', showCreateJob)
	document.createJobForm.submitCreateJob.addEventListener('click', createJob)
	document.createTaskForm.submitCreateTask.addEventListener('click', createTask)
	document.createTimerForm.startTimer.addEventListener('click', function(e) {
		e.preventDefault();
		startTime = Date.now();
		startISO = new Date().toISOString();
		document.getElementById("startTimer").setAttribute("disabled", "");
		document.getElementById("stopTimer").removeAttribute("disabled", "");
		document.getElementById("submitTime").setAttribute("disabled", "");
		currentTimerStart = startTime;
		currentTimerStartISO = startISO;
	})
	document.createTimerForm.stopTimer.addEventListener('click', function(e) {
		e.preventDefault();
		stopTime = Date.now();
		stopISO = new Date().toISOString();
		document.getElementById("startTimer").removeAttribute("disabled", "");
		document.getElementById("stopTimer").setAttribute("disabled", "");
		document.getElementById("submitTime").removeAttribute("disabled", "");
		currentTimerEnd = stopTime;
		currentTimerEndISO = stopISO;
		let timer = document.getElementById("createTimerForm");
		let durationMinutes = parseInt((currentTimerEnd - currentTimerStart) / 1000 / 60);
		let hours = durationMinutes / 60;
		let minutes = durationMinutes - (hours * 60);
		let timerResult = document.createElement("h4");
		timerResult.textContent = `${hours}H:${minutes}M`;
		timer.appendChild(timerResult);
		

	})
	document.createTimerForm.submitTime.addEventListener('click', createTimer)
	document.editTimerForm.saveTimer.addEventListener('click', updateTimer);
}

function searchJobs(e) {
	e.preventDefault();
	if (document.findJobsForm.searchCategory.value === "jobNumber") {
		loadJobsByJobNumberSearch(document.findJobsForm.keyword.value);
	}
	else {
		loadJobsByCustomerSearch(document.findJobsForm.keyword.value);
	}
}

///////////////////// GET JOBS ////////////////////////////////////////////////////////////

function loadJobs(e) {
	e.preventDefault();
	if (e.target.textContent === "Collapse All Jobs") {
		document.getElementById("jobsDetail").textContent = "";
		e.target.textContent = "View All Jobs";
	}
	else {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'api/jobs');
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					let jobs = JSON.parse(xhr.responseText);
					displayJobs(jobs);
					e.target.textContent = "Collapse All Jobs";
				}
			}
		};
		xhr.send();
	}
}

function loadJobById(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/jobs/${id}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let job = (JSON.parse(xhr.responseText));
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
				displayJobs(jobs);
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
				displayJobs(jobs);
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
			}
			else if (xhr.status === 404) {
				let task = [`No task found for ID# ${id}`]
			}
		}
	};
	xhr.send();
}

function loadTasksByJobId(e) {
	e.preventDefault();
	let id = e.target.parentElement.firstElementChild.textContent
	selectedJobId = id;
	let jobNumber = e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.textContent
	selectedJobNum = jobNumber;
	document.getElementById("createTaskHeader").setAttribute("hidden", "");
	document.getElementById("createTaskForm").setAttribute("hidden", "");
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/tasks/search/job/${id}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let tasks = JSON.parse(xhr.responseText);
				displayTasks(tasks, jobNumber);
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
			}
			else if (xhr.status === 404) {
				let timer = [`No timer found for ID# ${id}`]
			}
		}
	};
	xhr.send();
}

function loadTimersByTaskId(e) {
	e.preventDefault();
	let id = e.target.parentElement.firstElementChild.textContent
	selectedTaskId = id;
	let title = e.target.parentElement.firstElementChild.nextElementSibling.textContent
	selectedTaskTitle = title;
	document.getElementById("createTimerHeader").setAttribute("hidden", "");
	document.getElementById("createTimerForm").setAttribute("hidden", "");
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/timers/search/task/${id}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let timers = JSON.parse(xhr.responseText);
				displayTimers(timers);
			}
		}
	};
	xhr.send();
}

///////////////////// CREATE //////////////////////////////////////////////////////////
function showCreateJob(e) {
	e.preventDefault();
	let form = document.getElementById("createJobForm");
	let formHeader = document.getElementById("createJobHeader");
	formHeader.textContent = "Create Job";
	formHeader.removeAttribute("hidden");
	form.removeAttribute("hidden");
	form.jobNumber.value = "";
	form.customer.value = "";
	form.submitCreateJob.textContent = "Create Job";

}

function createJob(e) {
	e.preventDefault();
	let form = e.target.parentElement;
	let job = { "jobNumber": form.jobNumber.value, "customer": form.customer.value }
	let xhr = new XMLHttpRequest();

	if (e.target.textContent === "Update Job") {
		xhr.open('PUT', `api/jobs/${form.jobId.value}`, true);
	}
	else { xhr.open('POST', 'api/jobs', true); }

	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				form.setAttribute("hidden", "");
				let formHeader = document.getElementById("createJobHeader");
				formHeader.setAttribute("hidden", "");
				let resultString = document.getElementById("result");
				resultString.textContent = "Successfully added new job";
				resultString.style.color = "green";
				if (document.getElementById("jobsDetail").textContent.trim().length === 0) {
					return;
				}
				document.getElementById("viewJobs").click();
				document.getElementById("viewJobs").click();
			}
			else if (xhr.status === 200) {
				form.setAttribute("hidden", "");
				let formHeader = document.getElementById("createJobHeader");
				formHeader.setAttribute("hidden", "");
				let resultString = document.getElementById("result");
				resultString.textContent = "Successfully updated job";
				resultString.style.color = "green";
				if (document.getElementById("jobsDetail").textContent.trim().length === 0) {
					return;
				}
				document.getElementById("viewJobs").click();
				document.getElementById("viewJobs").click();
			}
			else if (xhr.status === 400) {
				form.setAttribute("hidden", "");
				let formHeader = document.getElementById("createJobHeader");
				formHeader.setAttribute("hidden", "");
				let resultString = document.getElementById("result");
				if (e.target.textContent === "Update Job") {
					resultString.textContent = "Unable to update job with the provided information. Make sure the Job Number is unique";
				}
				else { resultString.textContent = "Unable to add new job. Make sure the Job Number is unique"; }
				resultString.style.color = "red";
			}
		}
	};
	xhr.send(JSON.stringify(job));

	// clear the input data
	form.reset()
}

function showCreateTask(e) {
	e.preventDefault();
	let form = document.getElementById("createTaskForm");
	let formHeader = document.getElementById("createTaskHeader");
	formHeader.textContent = `Create Task for ${selectedJobNum}`;
	formHeader.removeAttribute("hidden");
	form.removeAttribute("hidden");
	form.title.value = "";
	form.description.value = "";
	form.submitCreateTask.textContent = "Create Task";

}

function createTask(e) {
	e.preventDefault();
	let form = e.target.parentElement;
	let task = { "title": form.title.value, "description": form.description.value, "totalTimeMin": form.totalTimeMin.value, "job": { "id": selectedJobId } }
	let xhr = new XMLHttpRequest();
	if (e.target.textContent === "Update Task") {
		xhr.open('PUT', `api/tasks/${form.taskId.value}`, true);
	}
	else { xhr.open('POST', 'api/tasks', true); }
	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				form.setAttribute("hidden", "");
				let formHeader = document.getElementById("createTaskHeader");
				formHeader.setAttribute("hidden", "");
				let resultString = document.getElementById("result");
				resultString.textContent = "Successfully added new task";
				resultString.style.color = "green";
				let btn = document.getElementById(`viewTasksByJobBtn${selectedJobId}`);
				btn.click();
				btn.click();
			}
			else if (xhr.status === 200) {
				form.setAttribute("hidden", "");
				let formHeader = document.getElementById("createTaskHeader");
				formHeader.setAttribute("hidden", "");
				let resultString = document.getElementById("result");
				resultString.textContent = "Successfully updated task";
				resultString.style.color = "green";
				let btn = document.getElementById(`viewTasksByJobBtn${selectedJobId}`);
				btn.click();
				btn.click();
			}
			else if (xhr.status === 400) {
				form.setAttribute("hidden", "");
				let formHeader = document.getElementById("createTaskHeader");
				formHeader.setAttribute("hidden", "");
				let resultString = document.getElementById("result");
				if (e.target.textContent === "Update Task") {
					resultString.textContent = "Unable to update task with the provided information";
				}
				else { resultString.textContent = "Unable to add new task"; }
				resultString.style.color = "red";
			}
		}
	};
	xhr.send(JSON.stringify(task));

	// clear the input data
	form.reset()
}

function showCreateTimer(e) {
	e.preventDefault();
	let form = document.getElementById("createTimerForm");
	let formHeader = document.getElementById("createTimerHeader");
	formHeader.textContent = `Create Timer for ${selectedTaskTitle}`;
	formHeader.removeAttribute("hidden");
	form.removeAttribute("hidden");
	form.submitTime.textContent = "Save Timer";

}

function createTimer(e) {
	e.preventDefault();
	let durationMinutes = (stopTime - startTime) / 1000 / 60;
	let hours = durationMinutes / 60;
	let minutes = durationMinutes - (hours * 60);
	let form = e.target.parentElement;
	let timer = { "start": startISO, "end": stopISO, "duration": durationMinutes, "task": { "id": selectedTaskId } }
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/timers', true);
	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				let timerResult = JSON.parse(xhr.responseText);
				document.getElementById("submitTime").setAttribute("disabled", "");
				let resultString = document.getElementById("result");
				resultString.textContent = "Successfully saved time";
				resultString.style.color = "green";
				let btn = document.getElementById(`viewTimersByTaskBtn${selectedTaskId}`);
				btn.click();
				btn.click();
				let showTaskUpdateBtn = document.getElementById(`editTaskBtn${selectedTaskId}`)
				showTaskUpdateBtn.click();
				let updateTaskBtn = document.getElementById("submitCreateTask");
				updateTaskBtn.click();
			}
			else if (xhr.status === 400) {
				let timerResult = ["400 - Bad Request"]
			}
		}
	};
	xhr.send(JSON.stringify(timer));

	// clear the input data
	form.reset()
}

///////////////////// DELETE //////////////////////////////////////////////////////////

function deleteJob(e) {
	e.preventDefault();
	let response = confirm("Are you sure you want to delete this job?");
	if (response) {
		document.getElementById("tasksDetail").textContent = "";
		document.getElementById("timersDetail").textContent = "";
		let id = e.target.parentElement.firstElementChild.textContent;
		let xhr = new XMLHttpRequest();
		xhr.open('DELETE', `api/jobs/${id}`);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 204) {
					let result = document.getElementById("result");
					result.textContent = "Successfully Deleted Job";
					result.style.color = "green";
					if (document.getElementById("jobsDetail").textContent.trim().length === 0) {
						return;
					}
					document.getElementById("viewJobs").click();
					document.getElementById("viewJobs").click();
				}
			}
		};
		xhr.send();
	}
}


function deleteTask(e) {
	e.preventDefault();
	let response = confirm("Are you sure you want to delete this task?");
	if (response) {
		document.getElementById("timersDetail").textContent = "";
		let id = e.target.parentElement.firstElementChild.textContent;
		let xhr = new XMLHttpRequest();
		xhr.open('DELETE', `api/tasks/${id}`);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 204) {
					let result = document.getElementById("result");
					result.textContent = "Successfully Deleted Task";
					result.style.color = "green";
					let btn = document.getElementById(`viewTasksByJobBtn${selectedJobId}`);
					btn.click();
					btn.click();
				}
			}
		};
		xhr.send();
	}
}

function deleteTimer(e) {
	e.preventDefault();
	let response = confirm("Are you sure you want to delete this timer?");
	if (response) {
		let id = e.target.parentElement.firstElementChild.textContent;
		let xhr = new XMLHttpRequest();
		xhr.open('DELETE', `api/timers/${id}`);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 204) {
					let result = document.getElementById("result");
					result.textContent = "Successfully Deleted Timer";
					result.style.color = "green";
					let btn = document.getElementById(`viewTimersByTaskBtn${selectedTaskId}`);
					btn.click();
					btn.click();
					let showTaskUpdateBtn = document.getElementById(`editTaskBtn${selectedTaskId}`)
					showTaskUpdateBtn.click();
					let updateTaskBtn = document.getElementById("submitCreateTask");
					updateTaskBtn.click();
				}
			}
		};
		xhr.send();
	}
}

///////////////////// UPDATE //////////////////////////////////////////////////////////

function showUpdateJob(e) {
	e.preventDefault();
	let id = e.target.parentElement.firstElementChild.textContent;
	let customer = e.target.parentElement.firstElementChild.nextElementSibling.textContent;
	let jobNumber = e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.textContent;
	let form = document.getElementById("createJobForm");
	let formHeader = document.getElementById("createJobHeader");
	formHeader.textContent = "Update Job";
	formHeader.removeAttribute("hidden");
	form.removeAttribute("hidden");
	form.jobNumber.value = jobNumber;
	form.customer.value = customer;
	form.submitCreateJob.textContent = "Update Job";
	form.jobId.value = id;
}

function showUpdateTask(e) {
	e.preventDefault();
	let id = e.target.parentElement.firstElementChild.textContent;
	let title = e.target.parentElement.firstElementChild.nextElementSibling.textContent;
	let description = e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.textContent;
	let totalTime = e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
	let form = document.getElementById("createTaskForm");
	let formHeader = document.getElementById("createTaskHeader");
	formHeader.textContent = "Update Task";
	formHeader.removeAttribute("hidden");
	form.removeAttribute("hidden");
	form.title.value = title;
	form.description.value = description;
	form.totalTimeMin.value = totalTime;
	form.submitCreateTask.textContent = "Update Task";
	form.taskId.value = id;
}

function showUpdateTimer(e) {
	e.preventDefault();
	let id = e.target.parentElement.firstElementChild.textContent;
	selectedTimerId = id;
	let start = e.target.parentElement.firstElementChild.nextElementSibling.textContent;
	let end = e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.textContent;
	let duration = e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
	let form = document.getElementById("editTimerForm");
	let formHeader = document.getElementById("editTimerHeader");
	formHeader.textContent = "Edit Timer";
	formHeader.removeAttribute("hidden");
	form.removeAttribute("hidden");
	form.timerId.value = id;
	form.start.value = start;
	form.end.value = end;
	form.duration.value = duration;
}

function updateTimer(e) {
	e.preventDefault();
	let form = e.target.parentElement;
	let timer = { "start": form.start.value, "end": form.end.value, "duration": form.duration.value, "task": { "id": selectedTaskId } }
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', `api/timers/${selectedTimerId}`, true);
	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				form.setAttribute("hidden", "");
				let formHeader = document.getElementById("editTimerHeader");
				formHeader.setAttribute("hidden", "");
				let resultString = document.getElementById("result");
				resultString.textContent = "Successfully updated timer";
				resultString.style.color = "green";
				let btn = document.getElementById(`viewTimersByTaskBtn${selectedTaskId}`);
				btn.click();
				btn.click();
				let showTaskUpdateBtn = document.getElementById(`editTaskBtn${selectedTaskId}`)
				showTaskUpdateBtn.click();
				let updateTaskBtn = document.getElementById("submitCreateTask");
				updateTaskBtn.click();

			}
			else if (xhr.status === 400) {
				form.setAttribute("hidden", "");
				let formHeader = document.getElementById("createTaskHeader");
				formHeader.setAttribute("hidden", "");
				let resultString = document.getElementById("result");
				if (e.target.textContent === "Update Task") {
					resultString.textContent = "Unable to update task with the provided information";
				}
				else { resultString.textContent = "Unable to add new task"; }
				resultString.style.color = "red";
			}
		}
	};
	xhr.send(JSON.stringify(timer));

	// clear the input data
	form.reset()

}


///////////////////// DISPLAY //////////////////////////////////////////////////////////

function displayJobs(jobs) {
	let div = document.getElementById("jobsDetail");
	div.textContent = "";
	let table = document.createElement("table");
	table.style.border = "black solid 1px";
	table.style.borderCollapse = "collapse";
	let thead = document.createElement("thead");
	let theadRow = document.createElement("tr");
	let th0 = document.createElement("th");
	th0.textContent = "ID #";
	theadRow.appendChild(th0);
	let th1 = document.createElement("th");
	th1.textContent = "Customer";
	theadRow.appendChild(th1);
	let th2 = document.createElement("th");
	th2.textContent = "Job Number";
	theadRow.appendChild(th2);
	thead.appendChild(theadRow);
	table.appendChild(thead);
	let tbody = document.createElement("tbody");
	for (let i = 0; i < jobs.length; i++) {
		let tbodyRow = document.createElement("tr");
		let td1 = document.createElement("td");
		td1.style.border = "black solid 1px";
		td1.style.padding = "3px";
		td1.textContent = jobs[i]["id"];
		tbodyRow.appendChild(td1);
		let td2 = document.createElement("td");
		td2.style.border = "black solid 1px";
		td2.style.padding = "3px";
		td2.textContent = jobs[i]["customer"];
		tbodyRow.appendChild(td2);
		let td3 = document.createElement("td");
		td3.style.border = "black solid 1px";
		td3.style.padding = "3px";
		td3.textContent = jobs[i]["jobNumber"];
		tbodyRow.appendChild(td3);
		let td4 = document.createElement("input");
		td4.type = "submit";
		td4.name = `editJobBtn${jobs[i]["id"]}`;
		td4.value = "Edit";
		td4.addEventListener('click', showUpdateJob)
		tbodyRow.appendChild(td4);
		let td5 = document.createElement("input");
		td5.type = "submit";
		td5.name = `deleteJobBtn${jobs[i]["id"]}`;
		td5.value = "Delete";
		td5.addEventListener('click', deleteJob)
		tbodyRow.appendChild(td5);
		let td6 = document.createElement("input");
		td6.type = "submit";
		td6.id = `viewTasksByJobBtn${jobs[i]["id"]}`
		td6.name = `viewTasksByJobBtn${jobs[i]["id"]}`;
		td6.value = "View Tasks";
		td6.addEventListener('click', loadTasksByJobId)
		tbodyRow.appendChild(td6);
		tbody.appendChild(tbodyRow);
	}
	table.appendChild(tbody);
	div.appendChild(table);
}


function displayTasks(tasks) {
	document.getElementById("timersDetail").textContent = "";
	let div = document.getElementById("tasksDetail");
	div.textContent = "";
	let head = document.createElement("h3");
	head.textContent = `Tasks for Job Number: ${selectedJobNum}`;
	div.append(head);
	let createBtn = document.createElement("button");
	createBtn.textContent = "Create New Task";
	div.append(createBtn);
	createBtn.addEventListener('click', showCreateTask);


	let table = document.createElement("table");
	table.style.border = "black solid 1px";
	table.style.borderCollapse = "collapse";
	let thead = document.createElement("thead");
	let theadRow = document.createElement("tr");
	let th0 = document.createElement("th");
	th0.textContent = "ID #";
	theadRow.appendChild(th0);
	let th1 = document.createElement("th");
	th1.textContent = "Title";
	theadRow.appendChild(th1);
	let th2 = document.createElement("th");
	th2.textContent = "Description";
	theadRow.appendChild(th2);
	let th3 = document.createElement("th");
	th3.textContent = "Total Time (Minutes)";
	theadRow.appendChild(th3);
	thead.appendChild(theadRow);
	table.appendChild(thead);
	let tbody = document.createElement("tbody");
	for (let i = 0; i < tasks.length; i++) {
		let tbodyRow = document.createElement("tr");
		let td1 = document.createElement("td");
		td1.style.border = "black solid 1px";
		td1.style.padding = "3px";
		td1.textContent = tasks[i]["id"];
		tbodyRow.appendChild(td1);
		let td2 = document.createElement("td");
		td2.style.border = "black solid 1px";
		td2.style.padding = "3px";
		td2.textContent = tasks[i]["title"];
		tbodyRow.appendChild(td2);
		let td3 = document.createElement("td");
		td3.style.border = "black solid 1px";
		td3.style.padding = "3px";
		td3.textContent = tasks[i]["description"];
		tbodyRow.appendChild(td3);
		let td35 = document.createElement("td");
		td35.style.border = "black solid 1px";
		td35.style.padding = "3px";
		td35.textContent = tasks[i]["totalTimeMin"];
		tbodyRow.appendChild(td35);
		let td4 = document.createElement("input");
		td4.type = "submit";
		td4.id = `editTaskBtn${tasks[i]["id"]}`;
		td4.name = `editTaskBtn${tasks[i]["id"]}`;
		td4.value = "Edit";
		td4.addEventListener('click', showUpdateTask)
		tbodyRow.appendChild(td4);
		let td5 = document.createElement("input");
		td5.type = "submit";
		td5.name = `deleteTaskBtn${tasks[i]["id"]}`;
		td5.value = "Delete";
		td5.addEventListener('click', deleteTask)
		tbodyRow.appendChild(td5);
		let td6 = document.createElement("input");
		td6.type = "submit";
		td6.id = `viewTimersByTaskBtn${tasks[i]["id"]}`;
		td6.name = `viewTimersByTaskBtn${tasks[i]["id"]}`;
		td6.value = "View Timers";
		td6.addEventListener('click', loadTimersByTaskId)
		tbodyRow.appendChild(td6);
		tbody.appendChild(tbodyRow);
	}
	table.appendChild(tbody);
	div.appendChild(table);
}

function displayTimers(timers) {
	let div = document.getElementById("timersDetail");
	div.textContent = "";
	let head = document.createElement("h3");
	head.textContent = `Timers for Task: ${selectedTaskTitle}`;
	div.append(head);
	let createBtn = document.createElement("button");
	createBtn.textContent = "Create New Timer";
	div.append(createBtn);
	createBtn.addEventListener('click', showCreateTimer);


	let table = document.createElement("table");
	table.style.border = "black solid 1px";
	table.style.borderCollapse = "collapse";
	let thead = document.createElement("thead");
	let theadRow = document.createElement("tr");
	let th0 = document.createElement("th");
	th0.textContent = "ID #";
	theadRow.appendChild(th0);
	let th1 = document.createElement("th");
	th1.textContent = "Start Time";
	theadRow.appendChild(th1);
	let th2 = document.createElement("th");
	th2.textContent = "End Time";
	theadRow.appendChild(th2);
	let th3 = document.createElement("th");
	th3.textContent = "Duration (minutes)";
	theadRow.appendChild(th3);
	thead.appendChild(theadRow);
	table.appendChild(thead);
	let tbody = document.createElement("tbody");
	for (let i = 0; i < timers.length; i++) {
		let tbodyRow = document.createElement("tr");
		let td0 = document.createElement("td");
		td0.style.border = "black solid 1px";
		td0.style.padding = "3px";
		td0.textContent = timers[i]["id"];
		tbodyRow.appendChild(td0);
		let td1 = document.createElement("td");
		td1.style.border = "black solid 1px";
		td1.style.padding = "3px";
		td1.textContent = timers[i]["start"];
		tbodyRow.appendChild(td1);
		let td2 = document.createElement("td");
		td2.style.border = "black solid 1px";
		td2.style.padding = "3px";
		td2.textContent = timers[i]["end"];
		tbodyRow.appendChild(td2);
		let td3 = document.createElement("td");
		td3.style.border = "black solid 1px";
		td3.style.padding = "3px";
		td3.textContent = timers[i]["duration"];
		tbodyRow.appendChild(td3);
		let td4 = document.createElement("input");
		td4.type = "submit";
		td4.name = `editTimerBtn${timers[i]["id"]}`;
		td4.value = "Edit";
		td4.addEventListener('click', showUpdateTimer)
		tbodyRow.appendChild(td4);
		let td5 = document.createElement("input");
		td5.type = "submit";
		td5.name = `deleteTimerBtn${timers[i]["id"]}`;
		td5.value = "Delete";
		td5.addEventListener('click', deleteTimer)
		tbodyRow.appendChild(td5);
		tbody.appendChild(tbodyRow);
	}
	table.appendChild(tbody);
	div.appendChild(table);
}
