package com.skilldistillery.timetracker.services;

import java.util.List;

import com.skilldistillery.timetracker.entities.Job;

public interface JobService {

	List<Job> allJobs();
	Job retrieveJobById(int id);
	Job createJob(Job job);
	Job updateJobById(Job job, int id);
	Boolean deleteJobById(int id);
}
