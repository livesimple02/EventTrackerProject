package com.skilldistillery.timetracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.timetracker.entities.Job;

public interface JobRepository extends JpaRepository<Job, Integer> {

	public List<Job> findByCustomerLike(String keyword);
	public List<Job> findByJobNumberLike(String keyword);
	
}
