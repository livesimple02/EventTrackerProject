package com.skilldistillery.timetracker.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

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
	void test_Task_mapping() {
		assertNotNull(task);
		assertEquals("Write Report", task.getTitle());
	}

}
