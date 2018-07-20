create table "Posts" (
	id serial primary key,
	title varchar(45),
	img text,
	content text,
	author_id integer references "Users" (id)
);