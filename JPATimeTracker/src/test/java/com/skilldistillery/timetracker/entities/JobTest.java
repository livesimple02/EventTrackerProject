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


class JobTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Job job;
	
	
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
		job = em.find(Job.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		job = null;
	}

	@Test
	void test_direct_Job_mapping() {
		assertNotNull(job);
		assertEquals("SD001001", job.getJobNumber());
		assertEquals("Skill Distillery", job.getCustomer());
	}
	
	@Test
	void test_one_Job_to_Many_Tasks_mapping() {
		assertNotNull(job.getTasks());
		assertTrue(job.getTasks().size() > 0);
		assertEquals(1, job.getTasks().get(0).getId());
	}

}
