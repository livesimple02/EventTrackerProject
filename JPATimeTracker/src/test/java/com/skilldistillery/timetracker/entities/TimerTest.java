package com.skilldistillery.timetracker.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDateTime;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


class TimerTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Timer timer;
	
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPATimeTracker");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		timer = em.find(Timer.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		timer = null;
	}

	@Test
	void test_direct_Timer_mapping() {
		assertNotNull(timer);
		assertEquals(LocalDateTime.of(2021, 8, 1, 8, 0, 0), timer.getStart());
		assertEquals(LocalDateTime.of(2021, 8, 1, 12, 0, 0), timer.getEnd());
		assertEquals(240, timer.getDuration());
	}
	
	@Test
	void test_Timer_to_Task_mapping() {
		assertNotNull(timer.getTask());
		assertEquals(Task.class, timer.getTask().getClass());
		assertEquals(1, timer.getTask().getId());
	}

}
