package com.skilldistillery.timetracker.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.timetracker.entities.Timer;
import com.skilldistillery.timetracker.repositories.TimerRepository;

@Service
public class TimerServiceImpl implements TimerService {

	@Autowired
	private TimerRepository timerRepo;
	
	@Override
	public List<Timer> allTimers() {
		return timerRepo.findAll();
	}
	
	

	
}
