package com.skilldistillery.timetracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.timetracker.entities.Task;
import com.skilldistillery.timetracker.entities.Timer;

public interface TimerRepository extends JpaRepository<Timer, Integer> {

	public List<Timer> findByTask(Task task);
}
