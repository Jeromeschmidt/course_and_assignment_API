# Course and Assignment API

This API allows users to add courses and assignments that can only be viewed by other users

API available at https://course-and-hw-api.herokuapp.com/

## Endpoints:

#### Assignments (TODOs)

| Route | Method | Description |
| ----------- | ----------- | ----------- |
|/assignments |GET | Gets all assignments |
|/assignments/{assignmentId} |GET | Get one assignment by id|
|/assignments | POST | add a new assignments |
|/assignments/{assignmentId}| PUT | update an existing assignments|
|/assignments/{assignmentId} | DELETE | delete a assignments |

{assignmentsId} = Route parameter = `:assignmentsId`
#### Courses

| Route | Method  | Description |
| ----------- | ----------- | ----------- |
|/courses/ | GET | get all courses |
|/courses/{courseId} |GET | Get one course by id|
|/courses | POST | add a new course to the database |
|/courses/{courseId}| PUT | update an existing course|
|/courses/{courseId} | DELETE | delete a course |

{courseId} = Route parameter = `:courseId`
