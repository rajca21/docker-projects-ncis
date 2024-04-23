SET GLOBAL log_error_verbosity = 1;
ALTER USER 'novi'@'%' IDENTIFIED WITH mysql_native_password BY 'novi';
GRANT ALL PRIVILEGES ON swfavorites.* TO 'novi'@'%';
FLUSH PRIVILEGES;
EXIT;