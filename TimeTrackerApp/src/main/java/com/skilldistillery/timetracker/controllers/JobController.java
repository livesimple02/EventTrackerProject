package com.skilldistillery.timetracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping("api")
@CrossOrigin ({"*", "http://localhost:4200"})
public class JobController {

	@Autowired
	private JobService jobSvc;

	@GetMapping("jobs")
	public List<Job> listJobs() {
		return jobSvc.allJobs();
	}

	@GetMapping("jobs/{id}")
	public Job retrieveJobById(@PathVariable Integer id, HttpServletResponse resp) {
		Job job = jobSvc.retrieveJobById(id);
		if (job == null) {
			resp.setStatus(404);
		}
		return job;
	}
	
	@GetMapping ("jobs/search/jobnumber/{keyword}")
	public List<Job> listJobsByJobNumberSearch(@PathVariable String keyword) {
		return jobSvc.searchJobsByJobNumber(keyword);
	}
	
	@GetMapping ("jobs/search/customer/{keyword}")
	public List<Job> listJobsByCustomerSearch(@PathVariable String keyword) {
		return jobSvc.searchJobsByCustomerKeyword(keyword);
	}

	@PostMapping("jobs")
	public Job createJob(@RequestBody Job job, HttpServletResponse resp, HttpServletRequest req) {
		System.out.println(job);
		Job createdJob = jobSvc.createJob(job);
		if (createdJob == null) {
			resp.setStatus(400);
		}
		else {
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(createdJob.getId());
			resp.setHeader("Location", url.toString());
		}
		return createdJob;
	}

	@PutMapping("jobs/{id}")
	public Job updateJobById(@RequestBody Job job, @PathVariable Integer id, HttpServletResponse resp, HttpServletRequest req) {
		Job jobRequested = jobSvc.retrieveJobById(id);
		if (jobRequested == null) {
			resp.setStatus(404);
			return jobRequested;
		}
		Job jobUpdated = jobSvc.updateJobById(job, id);
		if (jobUpdated == null) {
			resp.setStatus(400);
		}
		
		return jobUpdated;
	}

	@DeleteMapping("jobs/{id}")
	public void deleteJobById(@PathVariable Integer id, HttpServletResponse resp) {
		Job jobRequested = jobSvc.retrieveJobById(id);
		if (jobRequested == null) {
			resp.setStatus(404);
			return;
		}
		Boolean result = jobSvc.deleteJobById(id);
		if (result == false) {
			resp.setStatus(409);
			return;
		}
		else {
			resp.setStatus(204);
			return;
		}
	}
}
