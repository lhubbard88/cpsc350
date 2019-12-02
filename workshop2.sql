DROP TABLE IF EXISTS enrolled;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS workshops;

CREATE TABLE users (
  firstname Text NOT NULL,
  lastname  Text NOT NULL default '',
  username Text NOT NULL,
  email Text Not NULL,
  PRIMARY KEY (Username)
);
CREATE TABLE workshops (
	ID serial NOT NULL,
	title Text NOT NULL,
	time date NOT NULL,
	location Text NOT NULL,
	maxseats Integer NOT NULL,
	instructor Text NOT NULL,
	PRIMARY KEY (ID)
);
CREATE TABLE enrolled (
	ID integer REFERENCES workshops(ID),
	username Text REFERENCES users(username),
	PRIMARY KEY (ID, username)
);	

