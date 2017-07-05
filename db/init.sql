
-- Created by Nelson Mitchell ©2017

-- set up the db
create database scores;
use scores;
drop table highscores;
-- we only need one simple table, primary hidden key id auto-increments so same user can have multiple highscores
create table highscores (id int not null AUTO_INCREMENT, user VARCHAR(20), score int, PRIMARY KEY (id));

-- some dummy data to populate
insert into highscores (user, score) values("nelson", 100000);
insert into highscores (user, score) values("samuel", 1000000);
insert into highscores (user, score) values("theodore",10000000);
insert into highscores (user, score) values("jordan", 100000000);

-- display the highscores in order of highest score so we know it worked
select user, score from highscores order by score desc;

-- procedure to add then print highscores:
drop procedure add_score;
delimiter //
CREATE PROCEDURE add_score(IN in_user VARCHAR(20), IN in_score int)
  BEGIN
  insert into highscores (user, score)
    values (in_user, in_score);
  select user, score from highscores
    order by score desc;
  END//

delimiter ;
