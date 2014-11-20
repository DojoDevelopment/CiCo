/*
USE cd_login;
CREATE BUSINESS
INSERT INTO businesses (name, created_at) VALUES ('Coding Dojo', Now());

CREATE LOCATION
INSERT INTO locations (business_id, name, created_at) VALUES (1, 'Seattle', NOW());

CREATE MEMBER SUPERVISOR
INSERT INTO members (business_id, location_id, name, title, email, password, start_date, status, type, team, created_at) 
VALUES (1, 1, 'Michael Choi', 'Founder', 'mchoi@gmail.com', 'password', NOW(), 'active', 'contractor', 'managment', NOW());

CREATE MEMBER EMPLOYEE
INSERT INTO members (business_id, location_id, name, title, email, password, start_date, status, type, supervisor_id, team, created_at) 
VALUES (1, 1, 'Julian Nguyen', 'Intern', 'acanencia@gmail.com', 'password', NOW(), 'active', 'employee', 1, 'development', NOW());

READ ALL LOCATIONS
SELECT locations.name FROM locations WHERE business_id = 1;

READ ALL MEMBERS
SELECT members.name FROM members WHERE business_id = 1;

READ ALL MEMBERS IN LOCATION X
SELECT members.name FROM members WHERE business_id = 1 and members.location = ?;

USER DASHBOARD ALL USERS
SELECT members.picture, members.name, members.title, members.team,
  members2.supervisor_id AS Supervisor,
  locations2.name AS locations
FROM members 
LEFT JOIN locations AS locations2 ON locations2.id = members.location_id
LEFT JOIN members AS members2 ON members2.id = members.id
WHERE members.business_id = 1;

USER DASHBOARD ON LOCATION ID ?
SELECT members.picture, members.name, members.title, members.team,
  members2.supervisor_id AS Supervisor,
  locations2.name AS locations
FROM members 
LEFT JOIN locations AS locations2 ON locations2.id = members.location_id
LEFT JOIN members AS members2 ON members2.id = members.supervisor_id
WHERE members.business_id = 1
AND members.location_id = ?;

USER DASHBOARD ON LOCATION ID ? AND USER ID ?
SELECT members.picture, members.name, members.title, members.team,
  members2.supervisor_id AS Supervisor,
  locations2.name AS locations
FROM members 
LEFT JOIN locations AS locations2 ON locations2.id = members.location_id
LEFT JOIN members AS members2 ON members2.id = members.supervisor_id
WHERE members.business_id = 1
AND members.location_id = ?
AND members.id = ?;

ADMIN DASHBOARD ALL USERS
SELECT members.picture, members.name, members.title, members.team,
  members2.name AS Supervisor,
  locations2.name AS locations,
  members.note
FROM members 
LEFT JOIN locations AS locations2 ON locations2.id = members.location_id
LEFT JOIN members AS members2 ON members2.id = members.supervisor_id
WHERE members.business_id = 1;

ADMIN DASHBOARD ACTIVE / INACTIVE MEMBERS
SELECT members.picture, members.name, members.title, members.team,
  members2.supervisor_id AS Supervisor,
  locations2.name AS locations,
  members.note
FROM members 
LEFT JOIN locations AS locations2 ON locations2.id = members.location_id
LEFT JOIN members AS members2 ON members2.id = members.supervisor_id
WHERE members.business_id = 1
AND status = 'active'/'inactive';

CLOCK IN
INSERT INTO sessions (contractor_id, clock_in, created_at) VALUES (2, NOW(), NOW());

CLOCK OUT
UPDATE sessions SET clock_out=NOW(), personal_time=1.5, report='Coffee break', updated_at=Now(), updated_by=2 WHERE id = 1;

USER/ADMIN HISTORY
SELECT DATE_FORMAT(sessions.created_at, '%c/%d (%a)') as 'Date', 
  members.picture, members.name, members.title, members.team, members2.name as Supervisor, locations2.name as Location,
  DATE_FORMAT(sessions.clock_in, '%l:%i%p') as 'Clock In',
  DATE_FORMAT(sessions.clock_out, '%l:%i%p') as 'Clock Out', 
  CONCAT(sessions.personal_time, ' hrs') as 'Personal Time', 
  TIME_FORMAT(TIMEDIFF(sessions.clock_out, sessions.clock_in), '%k:%i') AS 'Billed Hours', 
  sessions.report
FROM members
LEFT JOIN sessions ON members.id = sessions.member_id
LEFT JOIN members AS members2 ON members2.id = members.supervisor_id
LEFT JOIN locations AS locations2 ON locations2.id = members.location_id
WHERE members.business_id = 1;

USER/ADMIN BY LOCATION
SELECT DATE_FORMAT(sessions.created_at, '%c/%d (%a)') as 'Date', 
  members.picture, members.name, members.title, members.team, members2.name as Supervisor, locations2.name as Location,
  DATE_FORMAT(sessions.clock_in, '%l:%i%p') as 'Clock In',
  DATE_FORMAT(sessions.clock_out, '%l:%i%p') as 'Clock Out', 
  CONCAT(sessions.personal_time, ' hrs') as 'Personal Time', 
  TIME_FORMAT(TIMEDIFF(sessions.clock_out, sessions.clock_in), '%k:%i') AS 'Billed Hours', 
  sessions.report
FROM members
LEFT JOIN sessions ON members.id = sessions.member_id
LEFT JOIN members AS members2 ON members2.id = members.supervisor_id
LEFT JOIN locations AS locations2 ON locations2.id = members.location_id
WHERE members.business_id = 1
AND members.location_id = ?;

USER/ADMIN BY MEMBER
SELECT DATE_FORMAT(sessions.created_at, '%c/%d (%a)') as 'Date', 
  members.picture, members.name, members.title, members.team, members2.name as Supervisor, locations2.name as Location,
  DATE_FORMAT(sessions.clock_in, '%l:%i%p') as 'Clock In',
  DATE_FORMAT(sessions.clock_out, '%l:%i%p') as 'Clock Out', 
  CONCAT(sessions.personal_time, ' hrs') as 'Personal Time', 
  TIME_FORMAT(TIMEDIFF(sessions.clock_out, sessions.clock_in), '%k:%i') AS 'Billed Hours', 
  sessions.report
FROM members
LEFT JOIN sessions ON members.id = sessions.member_id
LEFT JOIN members AS members2 ON members2.id = members.supervisor_id
LEFT JOIN locations AS locations2 ON locations2.id = members.location_id
WHERE members.business_id = 1
AND members.id = ?;

USER/ADMIN BY MEMBER
SELECT DATE_FORMAT(sessions.created_at, '%c/%d (%a)') as 'Date', 
  members.picture, members.name, members.title, members.team, members2.name as Supervisor, locations2.name as Location,
  DATE_FORMAT(sessions.clock_in, '%l:%i%p') as 'Clock In',
  DATE_FORMAT(sessions.clock_out, '%l:%i%p') as 'Clock Out', 
  CONCAT(sessions.personal_time, ' hrs') as 'Personal Time', 
  TIME_FORMAT(TIMEDIFF(sessions.clock_out, sessions.clock_in), '%k:%i') AS 'Billed Hours', 
  sessions.report
FROM members
LEFT JOIN sessions ON members.id = sessions.member_id
LEFT JOIN members AS members2 ON members2.id = members.supervisor_id
LEFT JOIN locations AS locations2 ON locations2.id = members.location_id
WHERE DATE(sessions.clock_in) between date('2012-11-03') and date('2015-11-05')
AND members.id = ?;
*/