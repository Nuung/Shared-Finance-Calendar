/* [프로시저] 디비 관리 유저 생성 ->  DB 생성 -> 유저에 권한 부여 */
DROP DATABASE IF EXISTS  sfc;
DROP USER IF EXISTS  sfc@localhost;
create user sfc@localhost identified WITH mysql_native_password  by 'sfc';
create database sfc;
grant all privileges on sfc.* to sfc@localhost with grant option;
commit;

USE sfc;