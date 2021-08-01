package com.skilldistillery.timetracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.timetracker.entities.Timer;

public interface TimerRepository extends JpaRepository<Timer, Integer> {

	
}
