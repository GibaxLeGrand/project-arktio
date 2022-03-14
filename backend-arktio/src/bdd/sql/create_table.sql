-- Equivalent de table en MySQL

create table Users (
    user_uuid binary(16) default(uuid_to_bin(uuid())) not null unique,
    user_email varchar(255) not null unique,
    user_name varchar(35) not null,
    user_pwd varchar(255) not null,

    primary key user_uuid
);