package com.skilldistillery.timetracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
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

import com.skilldistillery.timetracker.entities.Timer;
import com.skilldistillery.timetracker.services.TimerService;

@RestController
@RequestMapping("api")
public class TimerController {

	@Autowired
	private TimerService timerSvc;

	@GetMapping("timers")
	public List<Timer> listTimers() {
		return timerSvc.allTimers();
	}

	@GetMapping("timers/{id}")
	public Timer retrieveTimerById(@PathVariable Integer id, HttpServletResponse resp) {
		Timer timer = timerSvc.retrieveTimerById(id);
		if (timer == null) {
			resp.setStatus(404);
		}
		return timer;
	}
	
	@GetMapping("timers/search/task/{id}")
	public List<Timer> listTimersByTaskId (@PathVariable Integer id) {
		return timerSvc.listTimersByTaskId(id);
	}

	@PostMapping("timers")
	public Timer createTimer(@RequestBody Timer timer, HttpServletResponse resp, HttpServletRequest req) {
		Timer createdTimer = timerSvc.createTimer(timer);
		if (createdTimer == null) {
			resp.setStatus(400);
		} else {
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(createdTimer.getId());
			resp.setHeader("Location", url.toString());
		}
		return createdTimer;
	}

	@PutMapping("timers/{id}")
	public Timer updateTimerById(@RequestBody Timer timer, @PathVariable Integer id, HttpServletResponse resp) {
		Timer timerRequested = timerSvc.retrieveTimerById(id);
		if (timerRequested == null) {
			resp.setStatus(404);
			return timerRequested;
		}
		Timer timerUpdated = timerSvc.updateTimerById(timer, id);
		if (timerUpdated == null) {
			resp.setStatus(400);
		}

		return timerUpdated;
	}

	@DeleteMapping("timers/{id}")
	public void deleteTimerById(@PathVariable Integer id, HttpServletResponse resp) {
		Timer timerRequested = timerSvc.retrieveTimerById(id);
		if (timerRequested == null) {
			resp.setStatus(404);
			return;
		}
		Boolean result = timerSvc.deleteTimerById(id);
		if (result == false) {
			resp.setStatus(409);
			return;
		} else {
			resp.setStatus(204);
			return;
		}
	}

}
