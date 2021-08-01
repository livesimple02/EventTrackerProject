package com.skilldistillery.timetracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.timetracker.entities.Timer;
import com.skilldistillery.timetracker.services.TimerService;

@RestController
@RequestMapping ("api")
public class TimerController {

	@Autowired
	private TimerService timerSvc;
	
	@GetMapping ("timers")
	public List<Timer> listTimers() {
		return timerSvc.allTimers();
	}
	
	@GetMapping ("timers/{id}")
	public Timer retrieveTimerById(@PathVariable Integer id) {
		return null;
	}
	
	@PostMapping ("timers")
	public Timer createTimer(@RequestBody Timer timer) {
		return null;
	}
	
	@PutMapping ("timers/{id}")
	public Timer updateTimerById(@RequestBody Timer timer, @PathVariable Integer id) {
		return null;
	}
	
	@DeleteMapping ("timers/{id}")
	public void deleteTimerById(@PathVariable Integer id) {
		
	}
}
