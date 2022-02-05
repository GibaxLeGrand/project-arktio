-- Exemple de tables :
--      • Une table d'utilisateurs avec un id, email, nom utilisateur et mdp
--      • Une table de salles avec un id, code de salle et joueurs

create table Users (
    id int auto_increment not null,
    user_uuid binary(16) default(uuid_to_bin(uuid())) not null unique,
    user_email varchar(255) not null unique,
    user_name varchar(35) not null,
    user_pwd varchar(255) not null,

    constraint user_id primary key (id, user_uuid)
);

create table Rooms (
    id int auto_increment not null,
    room_code varchar(6) not null,
    room_players binary(16) null references Users(user_uuid),

    constraint room_id primary key(id) 
);