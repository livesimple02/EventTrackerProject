package com.skilldistillery.timetracker.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Task {

	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private int id;
	
	private String title;
	
	private String description;
	
	@Column (name = "total_time")
	private int totalTimeMin;
	
	@OneToMany (mappedBy = "task")
	private List<Timer> timers;
	
	@ManyToOne
	@JoinColumn (name = "job_id")
	private Job job;


	public Task() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getTotalTimeMin() {
		return totalTimeMin;
	}
	
	public void setTotalTimeMin(int totalTimeMin) {
		this.totalTimeMin = totalTimeMin;
	}
	
	public List<Timer> getTimers() {
		return timers;
	}

	public void setTimers(List<Timer> timers) {
		this.timers = timers;
	}
	
	public void addTimer(Timer timer) {
		if (timers == null) {
			timers = new ArrayList<>();
		}
		if (!timers.contains(timer)) {
			timers.add(timer);
		}
	}
	
	public void removeTimer(Timer timer) {
		if (timers != null && timers.contains(timer)) {
			timers.remove(timer);
		}
	}

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}

	@Override
	public String toString() {
		return "Task [id=" + id + ", title=" + title + ", description=" + description + ", totalTimeMin=" + totalTimeMin
				+ ", job=" + job + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Task other = (Task) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
	
}
