create database restomoyai;

use restomoyai;

drop table users;
drop table user_type;
drop table api_log;
drop table recipe;

create table users (
    `id` varchar(20) not null primary key,
    `username` varchar(255) not null,
    `email` varchar(255) not null,
    `phone_number` int not null,
    `password` varchar(255) not null,
    `dob` varchar(20) not null,
    `profile_pic` varchar(255) not null,
    `saldo` int not null,
    `api_key` varchar(15) not null,
    `api_hit` int not null,
    `role` int not null,
    `status` int not null,
    `type_id` int not null
);

create table user_type (
    `id` int not null primary key,
    `type`varchar (50) not null
);

create table api_log (
    `id` int not null primary key,
    `id_type` int not null,
    `api_quota` int not null,
    `api_per_use` int not null
);

create table api_use (
    `id_user` varchar(20) not null,
    `api_use` int,
);

create table recipe (
    `id` int not null primary key,
    `name` varchar(255) not null,
    `amount` int not null,
    `price` int not null,
    `image` int not null,
    `vitamin_amount` decimal(18,4),
    `sugar_amount` decimal(18,2),
    `calories` decimal(18,2),
    `alcohol` decimal(18,2),
    `caffeine` decimal(18,2),
    `protein` decimal(18,2),
    `calsium` decimal(18,2)
);

create table food (
    `name` varchar(255)
);

insert into user_type(`id`,`type`) values ("1","Free");
insert into user_type(`id`,`type`) values ("2","Member");
insert into user_type(`id`,`type`) values ("3","Professional");

insert into api_log(`id`,`id_type`,`api_quota`,`api_per_use`) values (1,1,240,6);
insert into api_log(`id`,`id_type`,`api_quota`,`api_per_use`) values (2,2,1000,5);
insert into api_log(`id`,`id_type`,`api_quota`,`api_per_use`) values (3,3,4000,4);