import connection from "../databases/postgres.js";

async function getPosts() {
	return connection.query(
    `SELECT 
    p.id, p.url, p.description, u.username, u."pictureUrl", p."creatorId", COUNT(reactions."postId") as likes
    FROM 
    posts p
    JOIN users u ON p."creatorId" = u.id
    LEFT JOIN reactions ON reactions."postId" = p.id
    GROUP BY p.id, u.id
    ORDER BY id DESC
    LIMIT 20
    `
  );
}

async function sendPost(id, description, url) {
	return connection.query('INSERT INTO posts ("creatorId", description, url) VALUES ($1, $2, $3)',[id, description, url]);
}

async function getPostUserId(userId) {
  return connection.query(
    `
    SELECT users.username, users."pictureUrl",
    posts.*
    FROM users
    LEFT JOIN posts
    ON users.id = posts."creatorId"
    WHERE users.id = $1
    GROUP BY users.id, posts.id
    ORDER BY posts.id DESC;
    `,
    [ userId ]
  );
}

export const postRepository = {
    getPosts,
    sendPost,
    getPostUserId
}