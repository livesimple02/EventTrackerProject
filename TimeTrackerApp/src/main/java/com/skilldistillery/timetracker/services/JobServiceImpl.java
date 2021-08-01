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
		if (result != null) {
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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean deleteJobById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

}
