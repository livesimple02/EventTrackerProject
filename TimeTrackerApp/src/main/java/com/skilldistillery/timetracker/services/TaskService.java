package com.skilldistillery.timetracker.services;

import java.util.List;

import com.skilldistillery.timetracker.entities.Task;

public interface TaskService {

	List<Task> allTasks();
	Task retrieveTaskById(int id);
	Task createTask(Task task);
	Task updateTaskById(Task task, int id);
	Boolean deleteTaskById(int id);
}
