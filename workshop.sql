DROP TABLE IF EXISTS workshops;
DROP TABLE IF EXISTS workshop server 1;
CREATE TABLE workshops (
  ID Serial NOT NULL,
  attendee Text NOT NULL,
  workshop Text NOT NULL default '',
  zipcode Integer NOT NULL default 0,
  PRIMARY KEY (ID)
);

INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Amelia Arbos','MongoDB',17800);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Bertha Button','Machine Learning', 82777);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Carl Carson', 'Self-Driving Cars', 34955);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Daniel Dust','DevOps 101',93883);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Eliza Elephant','React Fundamentals', 25737);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Fred Fish', 'Docker Container Fundamentals', 54657);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Grace Gold','Modern Javascript', 83254);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Heather Harrison','DevOps 101', 45279);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Isaac Irish', 'MongoDB', 53497);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Jessica Johnson','Machine Learning',94013);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Katie Kurig','React Fundamentals', 25737);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Linda Lean', 'Docker Container Fundamentals', 21730);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Martin Melson','MongoDB',33720);
INSERT INTO workshops  (attendee, workshop, zipcode)  VALUES ('Nancy Neutron','Machine Learning', 30043);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Oscar Olson', 'Self-Driving Cars', 72605);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Penelope Peters','DevOps 101',39283);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Quinn Quilt','React Fundamentals', 72573);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Richard Ray', 'Docker Container Fundamentals', 27937);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Stacy Still','Modern Javascript', 17654);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Trevor Turnstil','DevOps 101', 49377);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Ulrich Umpire', 'MongoDB', 53028);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Valorie Vent','Machine Learning',39281);
INSERT INTO workshops  (attendee, workshop, zipcode)  VALUES ('Walter Wilson','React Fundamentals', 72537);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Xavier Xe', 'Docker Container Fundamentals', 34230);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Yves Yellow','React Fundamentals', 19837);
INSERT INTO workshops (attendee, workshop, zipcode)  VALUES ('Zach Zebra', 'Docker Container Fundamentals', 92730);
