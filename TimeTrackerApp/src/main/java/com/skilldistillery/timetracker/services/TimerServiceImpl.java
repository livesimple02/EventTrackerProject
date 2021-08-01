package com.skilldistillery.timetracker.services;

import java.util.List;
import java.util.Optional;

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

	@Override
	public Timer retrieveTimerById(int id) {
		Timer timer = null;
		Optional<Timer> result = timerRepo.findById(id);
		if (result.isPresent()) {
			timer = result.get();
		}
		return timer;
	}

	@Override
	public Timer createTimer(Timer timer) {
		try {
			return timerRepo.save(timer);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Timer updateTimerById(Timer timer, int id) {
		try {
			Timer timerToUpdate = retrieveTimerById(id);
			timerToUpdate.setStart(timer.getStart());
			timerToUpdate.setEnd(timer.getEnd());
			timerToUpdate.setDuration(timer.getDuration());
			if (timer.getTask() != null) {
				timerToUpdate.setTask(timer.getTask());
			}
			return timerRepo.save(timerToUpdate);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Boolean deleteTimerById(int id) {
		try {
			timerRepo.deleteById(id);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		if (retrieveTimerById(id) != null) {
			return false;
		}
		return true;
	}

}
