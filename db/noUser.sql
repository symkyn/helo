select * from "Posts" join "Users" on "Posts".author_id = "Users".id where "Users".id != $1