package com.skilldistillery.timetracker.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


class TaskTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Task task;
	
	
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
		task = em.find(Task.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		task = null;
	}

	@Test
	void test_direct_Task_mapping() {
		assertNotNull(task);
		assertEquals("Build Backend", task.getTitle());
		assertEquals("Build a REST api backend for an event tracker.", task.getDescription());
		assertEquals(240, task.getTotalTimeMin());
	}
	
	@Test
	void test_one_Task_to_many_Timers_mapping() {
		assertNotNull(task.getTimers());
		assertTrue(task.getTimers().size() > 0);
		assertEquals(1, task.getTimers().get(0).getId());
	}
	
	@Test
	void test_Task_to_Job_mapping() {
		assertNotNull(task.getJob());
		assertEquals(Job.class, task.getJob().getClass());
		assertEquals(1, task.getJob().getId());
	}

}
