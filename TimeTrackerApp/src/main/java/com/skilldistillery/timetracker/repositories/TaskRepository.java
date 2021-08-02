package com.skilldistillery.timetracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.timetracker.entities.Job;
import com.skilldistillery.timetracker.entities.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {

	public List<Task> findByJob(Job job);
	
}
