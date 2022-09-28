use titanic;
-- tampilkan satu saja orang dengan fare terbesar 
select p.name , t.fare from passengers p 
join tickets t on t.id = p.ticketId
order by t.fare DESC
limit 1;

 -- tampilkan korban-korban tidak selamat yang umurnya diatas 20 tahun 
select p.survived, p.name, p.age from passengers p
where p.age >20 and p.survived = 0;

 -- tampilkan passenger yang wanita dan berumur diatas 10 dan dibawah 15 tahun  
 select p.sex, p.name, p.age from passengers p 
 where p.sex= "female" and p.age > 10 and p.age<15;

 -- tampilkan orang-orang bernama harris dan memiliki cabin
select p.name, p.cabin from passengers p
where p.name  LIKE 'harris,%' and p.cabin IS NOT NULL;

-- tampilkan orang-orang yang selamat dan urutkan berdasarkan umur paling tua . max 10 orang 
select p.survived, p.name, p.age from passengers p
where p.survived= 1
order by p.age DESC 
LIMIT 10;

-- tampilkan orang-orang bernama depan diawal huruf a dan selamat`
select p.survived, p.name from passengers p
where p.name LIKE 'a%' and p.survived=1;
