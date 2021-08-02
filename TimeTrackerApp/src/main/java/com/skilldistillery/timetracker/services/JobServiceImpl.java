package com.skilldistillery.timetracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.timetracker.entities.Job;
import com.skilldistillery.timetracker.repositories.JobRepository;

@Service
public class JobServiceImpl implements JobService {

	@Autowired
	private JobRepository jobRepo;

	@Override
	public List<Job> allJobs() {
		return jobRepo.findAll();
	}

	@Override
	public Job retrieveJobById(int id) {
		Job job = null;
		Optional<Job> result = jobRepo.findById(id);
		if (result.isPresent()) {
			job = result.get();
		}
		return job;
	}

	@Override
	public Job createJob(Job job) {
		try {
			return jobRepo.save(job);
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Job updateJobById(Job job, int id) {
		Job jobToUpdate = retrieveJobById(id);
		jobToUpdate.setJobNumber(job.getJobNumber());
		jobToUpdate.setCustomer(job.getCustomer());
		try {
			return jobRepo.save(jobToUpdate);
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Boolean deleteJobById(int id) {
		try {
			jobRepo.deleteById(id);
		}
		catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		if (retrieveJobById(id) != null) {
			return false;
		}
		return true;
	}

	@Override
	public List<Job> searchJobsByCustomerKeyword(String keyword) {
		String searchString = "%" + keyword + "%";
		return jobRepo.findByCustomerLike(searchString);
	}

	@Override
	public List<Job> searchJobsByJobNumber(String keyword) {
		String searchString = "%" + keyword + "%";
		return jobRepo.findByJobNumberLike(searchString);
	}

}
