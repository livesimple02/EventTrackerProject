package com.skilldistillery.timetracker.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.timetracker.entities.Task;
import com.skilldistillery.timetracker.repositories.TaskRepository;

@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	private TaskRepository taskRepo;
	
	@Override
	public List<Task> allTasks() {
		return taskRepo.findAll();
	}
	
	

	
}
