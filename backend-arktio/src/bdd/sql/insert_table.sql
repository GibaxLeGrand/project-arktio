-- Exemples d'insertions de données :

insert into Users (user_email, user_name, user_pwd) values ("toto@gmail.fr", "toto", MD5("toto"));
insert into Users (user_email, user_name, user_pwd) values ("tata@gmail.fr", "tata", MD5("tata"));

insert into Rooms (room_code, room_players) values ("aaaaaa", null);
insert into Rooms (room_code, room_players) values ("abcdef", null);
insert into Rooms (room_code, room_players) values ("abcdef", (select user_uuid from Users where user_name = 'toto'));
insert into Rooms (room_code, room_players) values ("abcdef", (select user_uuid from Users where user_name = 'tata'));