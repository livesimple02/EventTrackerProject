package com.skilldistillery.timetracker.services;

import java.util.List;

import com.skilldistillery.timetracker.entities.Timer;

public interface TimerService {

	List<Timer> allTimers();
	Timer retrieveTimerById(int id);
	Timer createTimer(Timer timer);
	Timer updateTimerById(Timer timer, int id);
	Boolean deleteTimerById(int id);
}
