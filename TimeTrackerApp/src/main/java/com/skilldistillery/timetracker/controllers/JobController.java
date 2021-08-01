package com.skilldistillery.timetracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.timetracker.entities.Job;
import com.skilldistillery.timetracker.services.JobService;

@RestController
@RequestMapping ("api")
public class JobController {

	@Autowired
	private JobService jobSvc;
	
	@GetMapping ("jobs")
	public List<Job> listJobs() {
		return jobSvc.allJobs();
	}
	
	@GetMapping ("jobs/{id}")
	public Job retrieveJobById(@PathVariable Integer id, HttpServletResponse resp) {
		Job job = jobSvc.retrieveJobById(id);
		if (job == null) { resp.setStatus(404);}
		return job;
	}
	
	@PostMapping ("jobs")
	public Job createJob(@RequestBody Job job) {
		return null;  // return job;
	}
	
	@PutMapping ("jobs/{id}")
	public Job updateJobById(@RequestBody Job job, @PathVariable Integer id) {
		return null;  // return job;
	}
	
	@DeleteMapping ("jobs/{id}")
	public void deleteJobById(@PathVariable Integer id) {
		
	}
}
