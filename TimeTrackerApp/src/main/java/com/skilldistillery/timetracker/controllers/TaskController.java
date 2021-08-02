package com.skilldistillery.timetracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.timetracker.entities.Task;
import com.skilldistillery.timetracker.services.TaskService;

@RestController
@RequestMapping("api")
public class TaskController {

	@Autowired
	private TaskService taskSvc;

	@GetMapping("tasks")
	public List<Task> listTasks() {
		return taskSvc.allTasks();
	}

	@GetMapping("tasks/{id}")
	public Task retrieveTaskById(@PathVariable Integer id, HttpServletResponse resp) {
		Task task = taskSvc.retrieveTaskById(id);
		if (task == null) {
			resp.setStatus(404);
		}
		return task;
	}
	
	@GetMapping("tasks/search/job/{id}")
	public List<Task> listTasksByJob (@PathVariable Integer id) {
		return taskSvc.listTasksByJobId(id);
	}
	
	@PostMapping("tasks")
	public Task createTask(@RequestBody Task task, HttpServletResponse resp, HttpServletRequest req) {
		Task createdTask = taskSvc.createTask(task);
		if (createdTask == null) {
			resp.setStatus(400);
		} else {
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(createdTask.getId());
			resp.setHeader("Location", url.toString());
		}
		return createdTask;
	}

	@PutMapping("tasks/{id}")
	public Task updateTaskById(@RequestBody Task task, @PathVariable Integer id, HttpServletResponse resp) {
		Task taskRequested = taskSvc.retrieveTaskById(id);
		if (taskRequested == null) {
			resp.setStatus(404);
			return taskRequested;
		}
		Task taskUpdated = taskSvc.updateTaskById(task, id);
		if (taskUpdated == null) {
			resp.setStatus(400);
		}

		return taskUpdated;
	}

	@DeleteMapping("tasks/{id}")
	public void deleteTaskById(@PathVariable Integer id, HttpServletResponse resp) {
		Task taskRequested = taskSvc.retrieveTaskById(id);
		if (taskRequested == null) {
			resp.setStatus(404);
			return;
		}
		Boolean result = taskSvc.deleteTaskById(id);
		if (result == false) {
			resp.setStatus(409);
			return;
		} else {
			resp.setStatus(204);
			return;
		}
	}

}
