-- 删除用户
use mysql;
select User,Host from user WHERE User='ledger_admin' and Host='%';
drop user ledger_admin@'%';
flush privileges;
-- 删除数据库
DROP DATABASE ledger;

-- 创建用户
use mysql;
create user 'ledger_admin'@'%' IDENTIFIED by '12345678';
-- 授权用户
grant SELECT,
	INSERT,
	UPDATE,
	DELETE,
  CREATE,
	CREATE VIEW,
	EXECUTE,
	DROP,
	INDEX,
	ALTER on ledger.* to 'ledger_admin'@'%';
FLUSH PRIVILEGES;
SHOW GRANTS for ledger_admin;