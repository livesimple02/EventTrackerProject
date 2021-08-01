package com.skilldistillery.timetracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.timetracker.entities.Job;
import com.skilldistillery.timetracker.entities.Task;
import com.skilldistillery.timetracker.services.TaskService;

@RestController
@RequestMapping ("api")
public class TaskController {

	@Autowired
	private TaskService taskSvc;
	
	@GetMapping ("tasks")
	public List<Task> listTasks() {
		return taskSvc.allTasks();
	}
	
	@GetMapping ("tasks/{id}")
	public Task retrieveTaskById(@PathVariable Integer id) {
		return null;
	}
	
	@PostMapping ("tasks")
	public Task createTask(@RequestBody Task task) {
		return null;
	}
	
	@PutMapping ("tasks/{id}")
	public Job updateTaskById(@RequestBody Task task, @PathVariable Integer id) {
		return null;
	}
	
	@DeleteMapping ("tasks/{id}")
	public void deleteTaskById(@PathVariable Integer id) {
		
	}
	
	
}
