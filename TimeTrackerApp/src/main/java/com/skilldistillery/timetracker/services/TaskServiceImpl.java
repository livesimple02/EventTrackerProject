package com.skilldistillery.timetracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.timetracker.entities.Job;
import com.skilldistillery.timetracker.entities.Task;
import com.skilldistillery.timetracker.repositories.JobRepository;
import com.skilldistillery.timetracker.repositories.TaskRepository;

@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	private TaskRepository taskRepo;
	@Autowired
	private JobRepository jobRepo;

	@Override
	public List<Task> allTasks() {
		return taskRepo.findAll();
	}

	@Override
	public Task retrieveTaskById(int id) {
		Task task = null;
		Optional<Task> result = taskRepo.findById(id);
		if (result.isPresent()) {
			task = result.get();
		}
		return task;
	}

	@Override
	public Task createTask(Task task) {
		try {
			return taskRepo.save(task);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Task updateTaskById(Task task, int id) {
		try {
			Task taskToUpdate = retrieveTaskById(id);
			taskToUpdate.setTitle(task.getTitle());
			taskToUpdate.setDescription(task.getDescription());
			taskToUpdate.setTotalTimeMin(task.getTotalTimeMin());
			if (task.getJob() != null) {
				taskToUpdate.setJob(task.getJob());
			}
			return taskRepo.save(taskToUpdate);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Boolean deleteTaskById(int id) {
		try {
			taskRepo.deleteById(id);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		if (retrieveTaskById(id) != null) {
			return false;
		}
		return true;
	}

	@Override
	public List<Task> listTasksByJobId(int id) {
		Optional<Job> jobResult = jobRepo.findById(id);
		if (jobResult.isPresent()) {
			Job jobToSearch = jobResult.get();
			return taskRepo.findByJob(jobToSearch);
		}
		else {
			return null;
		}
	}

}
