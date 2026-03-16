

SELECT review.content, user_account.username
from review
JOIN user_account
on review.user_id = user_account.id
where review.book_id = ${variablename}(id of the book)


SELECT review.text, user_account.name FROM review JOIN user_account ON review.user_id = user_account.id WHERE review.book_id=$1;


SELECT review.content, user_account.username
from review
inner join user_account
on review.user_id = user_account.id
where review.book_id = $1, [id]

-- ${variablename}(id of the book)
