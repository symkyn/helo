select * from "Posts" join "Users" on "Posts".author_id = "Users".id where title like $1