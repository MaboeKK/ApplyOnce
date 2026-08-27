-- Runs automatically by the postgres image on first container init only
-- (i.e. when the data volume is created fresh). Gives the Jest suite its
-- own database, isolated from the "applyonce" dev database.
--
-- If your postgres volume already existed before this file was added, run
-- this manually once instead:
--   psql -h localhost -p 3610 -U applyonce -d applyonce -c "CREATE DATABASE applyonce_test;"
CREATE DATABASE applyonce_test;
