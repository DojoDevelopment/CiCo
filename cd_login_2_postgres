CREATE TYPE employee_status AS ENUM ('active', 'inactive');
CREATE TYPE employee_type AS ENUM ('employee', 'contractor');

CREATE TABLE businesses (
	id SERIAL NOT NULL,
	name varchar(255) NOT NULL,
	ip_addresses varchar(255),
	created_at timestamp NOT NULL,
	updated_at timestamp,
	PRIMARY KEY (id)
);
CREATE TABLE locations (
	id SERIAL NOT NULL,
	business_id int NOT NULL,
	name varchar(255) NOT NULL,
	created_at timestamp NOT NULL,
	updated_at timestamp,
	PRIMARY KEY (id)
);
CREATE TABLE members (
	id SERIAL NOT NULL,
	business_id int NOT NULL,
	location_id int NOT NULL,
	name varchar(255) NOT NULL,
	title varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(255),
	start_date timestamp NOT NULL,
	status employee_status NOT NULL,
	note text,
	picture varchar(255),
	team text,
	supervisor_id int,
	type employee_type NOT NULL,
	created_at timestamp NOT NULL,
	updated_at timestamp,
	updated_by int,
	PRIMARY KEY (id)
);
CREATE TABLE sessions (
	id SERIAL NOT NULL,
	member_id int NOT NULL,
	clock_in timestamp NOT NULL,
	clock_out timestamp,
	personal_time float,
	report text,
	created_at timestamp NOT NULL,
	updated_at timestamp,
	updated_by int,
	PRIMARY KEY (id)
);

ALTER TABLE locations
	ADD FOREIGN KEY (business_id) 
	REFERENCES businesses (id);

ALTER TABLE members
	ADD FOREIGN KEY (business_id) 
	REFERENCES businesses (id);

ALTER TABLE members
	ADD FOREIGN KEY (location_id) 
	REFERENCES locations (id);


ALTER TABLE sessions
	ADD FOREIGN KEY (member_id) 
	REFERENCES members (id);

INSERT INTO businesses(id, name, ip_addresses, created_at, updated_at) VALUES (1, 'Coding Dojo', null, '2014-11-18 16:33:35', null);
INSERT INTO locations(id, business_id, name, created_at, updated_at) VALUES (1, 1, 'Mountain View', '2014-11-18 16:33:45', null);
INSERT INTO locations(id, business_id, name, created_at, updated_at) VALUES (2, 1, 'Seattle', '2014-11-18 17:16:18', null);
INSERT INTO locations(id, business_id, name, created_at, updated_at) VALUES (3, 1, 'Denver', '2014-11-18 17:16:20', null);
INSERT INTO members(id, business_id, location_id, name, title, email, password, start_date, status, note, picture, team, supervisor_id, type, created_at, updated_at, updated_by) VALUES (1, 1, 1, 'Michael Choi', 'Founder', 'mchoi@gmail.com', 'password', '2014-11-18 16:37:43', 'active', null, null, 'Management', null, 'contractor', '2014-11-18 16:37:43', null, null);
INSERT INTO members(id, business_id, location_id, name, title, email, password, start_date, status, note, picture, team, supervisor_id, type, created_at, updated_at, updated_by) VALUES (2, 1, 1, 'Anthony Fenech', 'Intern', 'afenech@gmail.com', 'password', '2014-11-18 16:41:35', 'active', null, null, 'development', 1, 'employee', '2014-11-18 16:41:35', null, null);
INSERT INTO members(id, business_id, location_id, name, title, email, password, start_date, status, note, picture, team, supervisor_id, type, created_at, updated_at, updated_by) VALUES (3, 1, 2, 'Alvaro Canencia', 'Intern', 'acanencia@gmail.com', 'password', '2014-11-18 17:17:40', 'active', null, null, 'development', 4, 'employee', '2014-11-18 17:17:40', null, null);
INSERT INTO members(id, business_id, location_id, name, title, email, password, start_date, status, note, picture, team, supervisor_id, type, created_at, updated_at, updated_by) VALUES (4, 1, 2, 'Julian Nguyen', 'Intern', 'acanencia@gmail.com', 'password', '2014-11-18 17:18:01', 'active', null, null, 'development', 1, 'employee', '2014-11-18 17:18:01', null, null);
INSERT INTO members(id, business_id, location_id, name, title, email, password, start_date, status, note, picture, team, supervisor_id, type, created_at, updated_at, updated_by) VALUES (5, 1, 2, 'Trey Villafane', 'Intructor', 'trey.villafane@gmail.com', 'password', '2014-11-18 17:18:01', 'active', null, null, 'instructors', 1, 'employee', '2014-01-01 05:00:00', null, null);
INSERT INTO members(id, business_id, location_id, name, title, email, password, start_date, status, note, picture, team, supervisor_id, type, created_at, updated_at, updated_by) VALUES (6, 1, 1, 'Jay Patel', 'Intructor', 'nick', 'password', '2014-11-18 17:18:01', 'active', null, null, 'instructors', 1, 'employee', '2014-01-01 01:00:00', null, null);
INSERT INTO sessions(id, member_id, clock_in, clock_out, personal_time, report, created_at, updated_at, updated_by) VALUES (1, 2, '2014-11-18 18:41:52', '2014-11-18 18:43:24', 1.5, 'Coffee break', '2014-11-18 18:41:52', '2014-11-18 18:43:24', 2);
INSERT INTO sessions(id, member_id, clock_in, clock_out, personal_time, report, created_at, updated_at, updated_by) VALUES (7, 2, '2014-11-18 18:41:52', '2014-11-18 18:43:24', 0.5, 'walk', '2014-11-11 18:41:52', null, null);
INSERT INTO sessions(id, member_id, clock_in, clock_out, personal_time, report, created_at, updated_at, updated_by) VALUES (8, 1, '2014-11-18 05:41:52', '2014-11-18 18:00:24', 2, 'lunch', '2014-11-04 18:41:52', null, null);
INSERT INTO sessions(id, member_id, clock_in, clock_out, personal_time, report, created_at, updated_at, updated_by) VALUES (9, 3, '2014-11-17 05:41:52', '2014-11-18 18:00:24', 1, 'lunch', '2014-10-17 18:41:52', null, null);
INSERT INTO sessions(id, member_id, clock_in, clock_out, personal_time, report, created_at, updated_at, updated_by) VALUES (10, 4, '2014-11-24 13:51:14', '2014-11-24 13:51:19', 1.5, 'Coffee break', '2014-10-02 13:51:14', '2014-11-24 13:51:19', 4);
INSERT INTO sessions(id, member_id, clock_in, clock_out, personal_time, report, created_at, updated_at, updated_by) VALUES (11, 2, '2014-11-24 13:56:08', '2014-11-24 13:56:13', 1.5, 'Coffee break', '2014-09-24 13:56:08', '2014-11-24 13:56:13', 2);
INSERT INTO sessions(id, member_id, clock_in, clock_out, personal_time, report, created_at, updated_at, updated_by) VALUES (12, 5, '2014-11-25 09:44:29', null, null, null, '2014-11-25 09:44:29', null, null);
INSERT INTO sessions(id, member_id, clock_in, clock_out, personal_time, report, created_at, updated_at, updated_by) VALUES (13, 1, '2014-11-25 09:44:31', null, null, null, '2014-11-25 09:44:31', null, null);
INSERT INTO sessions(id, member_id, clock_in, clock_out, personal_time, report, created_at, updated_at, updated_by) VALUES (14, 2, '2014-11-25 09:44:33', null, null, null, '2014-11-25 09:44:33', null, null);
INSERT INTO sessions(id, member_id, clock_in, clock_out, personal_time, report, created_at, updated_at, updated_by) VALUES (15, 3, '2014-11-25 15:20:17', null, null, null, '2014-11-25 15:20:17', null, null);
INSERT INTO sessions(id, member_id, clock_in, clock_out, personal_time, report, created_at, updated_at, updated_by) VALUES (16, 6, '2014-11-26 12:02:05', null, null, null, '2014-11-26 12:02:05', null, null);