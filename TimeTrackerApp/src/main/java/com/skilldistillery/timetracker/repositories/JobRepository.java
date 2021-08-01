package com.skilldistillery.timetracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.timetracker.entities.Job;

public interface JobRepository extends JpaRepository<Job, Integer> {

	
}
