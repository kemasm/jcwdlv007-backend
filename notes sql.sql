-- relational database
-- memiliki hubungan antara table
-- passengers
-- ports
-- ticket
use titanic;
-- select from table
select * from passengers
order by id desc;

-- insert data to table
insert into passengers (id, survived, pclass,name,sex,age,sibsp,parch,cabin,ticketId,portId)
values (892,'1','1', 'Jordan', 'male', '26', '1','0',null,'2','2' );
SET SQL_SAFE_UPDATES = 0;

-- update data in table
update passengers set name = 'J' where id = 892;

-- delete 
delete from passengers where id = 892;

-- primary key
-- foreign key 

select p.name , t.ticket , po.city from passengers p 
join tickets t on t.id = p.ticketId 
join ports po on po.id = p.portId

order by po.city DESC ;

