INSERT INTO [User](Username, Password, Email, Name, Surname, Role) VALUES('dev1', 'AQAAAAEAACcQAAAAEPKfM9Is3tGkioYwUBEWWf+lsKG8aFXlTgr00x5rXB2TAeSRK0FJxsuCie+eujsxwA==', 'dev1@gmail.com', 'Developer', '1', 'Developer')
INSERT INTO [User](Username, Password, Email, Name, Surname, Role) VALUES('dev2', 'AQAAAAEAACcQAAAAEPKfM9Is3tGkioYwUBEWWf+lsKG8aFXlTgr00x5rXB2TAeSRK0FJxsuCie+eujsxwA==', 'dev2@gmail.com', 'Developer', '2', 'Developer')
INSERT INTO [User](Username, Password, Email, Name, Surname, Role) VALUES('dev3', 'AQAAAAEAACcQAAAAEPKfM9Is3tGkioYwUBEWWf+lsKG8aFXlTgr00x5rXB2TAeSRK0FJxsuCie+eujsxwA==', 'dev3@gmail.com', 'Developer', '3', 'Developer')
INSERT INTO [User](Username, Password, Email, Name, Surname, Role) VALUES('manager1', 'AQAAAAEAACcQAAAAEPKfM9Is3tGkioYwUBEWWf+lsKG8aFXlTgr00x5rXB2TAeSRK0FJxsuCie+eujsxwA==', 'manager1@gmail.com', 'Project Manager', '1', 'Project Manager')
INSERT INTO [User](Username, Password, Email, Name, Surname, Role) VALUES('manager2', 'AQAAAAEAACcQAAAAEPKfM9Is3tGkioYwUBEWWf+lsKG8aFXlTgr00x5rXB2TAeSRK0FJxsuCie+eujsxwA==', 'manager2@gmail.com', 'Project Manager', '2', 'Project Manager')

INSERT INTO Project(Name, Assignee) VALUES ('Project 1', 'manager1')
INSERT INTO Project(Name, Assignee) VALUES ('Project 2', 'manager1')
INSERT INTO Project(Name, Assignee) VALUES ('Project 3', 'manager2')

INSERT INTO Task(Assignee, Status, Progress, Deadline, Description, ProjectId) VALUES('dev1', 'New', 0, '1-1-2020', 'Task 1', (SELECT Code FROM Project WHERE Name = 'Project 1'))
INSERT INTO Task(Assignee, Status, Progress, Deadline, Description, ProjectId) VALUES('dev1', 'Finished', 100, '2-2-2020', 'Task 2', (SELECT Code FROM Project WHERE Name = 'Project 2'))
INSERT INTO Task(Assignee, Status, Progress, Deadline, Description, ProjectId) VALUES('dev1', 'In Progress', 35, '3-3-2020', 'Task 3', (SELECT Code FROM Project WHERE Name = 'Project 1'))
INSERT INTO Task(Assignee, Status, Progress, Deadline, Description, ProjectId) VALUES('dev2', 'In Progress', 43, '4-4-2020', 'Task 4', (SELECT Code FROM Project WHERE Name = 'Project 1'))
INSERT INTO Task(Assignee, Status, Progress, Deadline, Description, ProjectId) VALUES('dev2', 'New', 0, '5-5-2020', 'Task 5', (SELECT Code FROM Project WHERE Name = 'Project 2'))
INSERT INTO Task(Assignee, Status, Progress, Deadline, Description, ProjectId) VALUES(NULL, 'New', 0, '6-6-2020', 'Task 6', (SELECT Code FROM Project WHERE Name = 'Project 3'))