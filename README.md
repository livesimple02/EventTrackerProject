# EventTrackerProject

### Full Stack Spring/REST project for Skill Distillery

## Overview
This application is built with the intent of allowing users to track time spent on completing tasks related to a job and/or customer. This application is ideal for users who need to keep track of hours for billing purposes or budgeting purposes.

Currently, this application consists only of back-end code. The code has been built utilizing Spring Data JPA coupled with Spring REST. All REST endpoints have been tested with Postman to ensure appropriate response bodies and status'.

## REST Endpoints

| CRUD Op. | HTTP Verb | URI                  | Request Body | Response Body |
|----------|-----------|----------------------|--------------|---------------|
| Read     | GET       | `/api/jobs`            |                                                                       | Collection of representations of all Jobs. Status: 200 - Ok |
| Read     | GET       | `/api/jobs/{jobId#}`     |                                                                       | Representation of Job w/ jobId#. Status: 200 - Ok, 404 - Not Found |
| Read     | GET       | `/api/jobs/search/customer/{keyword}`            |                                                                       | Collection of representations of all Jobs that contain the keyword within the cusotmer field. Status: 200 - Ok |
| Read     | GET       | `/api/jobs/search/jobnumber/{keyword}`            |                                                                       | Collection of representations of all Jobs that contain the keyword within the jobNumber field. Status: 200 - Ok |
| Create   | POST      | `/api/jobs`            | Representation of a new Job                                           | Representation of newly created Job. Status: 201 - Created, 400 - Bad Request|
| Update   | PUT       | `/api/jobs/{jobId#}`     | Representation of a new version of Job w/ jobId#                      | Representation of updated Job w/ jobId#. Status: 200 - Ok, 404 - Not Found, 400 - Bad Request|
| Delete   | DELETE    | `/api/jobs/{jobId#}`     |                                                                       | Status: 204 - No Content, 404 - Not Found |
| Read     | GET       | `/api/tasks`           |                                                                       | Collection of representations of all Tasks. Status: 200 - Ok  |
| Read     | GET       | `/api/tasks/{taskId#}`   |                                                                       | Representation of Task w/ taskId#. Status: 200 - Ok, 404 - Not Found  |
| Read     | GET       | `/api/tasks/search/job/{jobId#}`   |                                                                       | Collection of representations of all tasks that belong to the job with jobId#. Status: 200 |
| Create   | POST      | `/api/tasks`           | Representation of a new Task                                          | Representation of newly created Task. Status: 201 - Created, 400 - Bad Request |
| Update   | PUT       | `/api/tasks/{taskId#}`   | Representation of a new version of Task w/ taskId#                    | Representation of updated Task w/ taskId#. Status: 200 - Ok, 404 - Not Found, 400 - Bad Request|
| Delete   | DELETE    | `/api/tasks/{taskId#}`   |                                                                       | Status: 204 - No Content, 404 - Not Found |
| Read     | GET       | `/api/timers`          |                                                                       | Collection of representations of all Timers. Status: 200 - Ok  |
| Read     | GET       | `/api/timers/{timerId#}` |                                                                       | Representation of Timer w/ timerId#. Status: 200 - Ok, 404 - Not Found  |
| Create   | POST      | `/api/timers`          | Representation of a new Timer                                         | Representation of newly created Timer. Status: 201 - Created, 400 - Bad Request |  
| Update   | PUT       | `/api/timers/{timerId#}` | Representation of a new version of Timer w/ timerId#                  | Representation of updated Timer w/ timerId#. Status: 200 - Ok, 404 - Not Found, 400 - Bad Request|
| Delete   | DELETE    | `/api/timers/{timerId#}` |                                                                       | Status: 204 - No Content, 404 - Not Found |


## Database Schema

![timedb Schema](DB/timedb.png)
