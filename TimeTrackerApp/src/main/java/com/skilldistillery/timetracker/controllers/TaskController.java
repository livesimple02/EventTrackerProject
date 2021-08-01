package com.skilldistillery.timetracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
