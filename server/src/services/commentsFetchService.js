const connection = require("../database/db");

let fetchComment = function (req, res) {
  let user_id = req.query.user_id ?? 0
  connection.query(
    `select * from (select comments.id,comments.comment,comments.createdAt,users.name,count(u1.id) as total_upvotes,count(u2.id) > 0 as upvoted from comments left join users on users.id=comments.userId left join upvotes u1 on u1.commentId=comments.id left join upvotes u2 on comments.id=u2.commentId and u2.userId=${user_id} GROUP BY u2.id,comments.id) as all_comments group by id;`,
    function (err, results, fields) {
      if (!err) {
        return res.json(results)
      } else {
        return res.status(400)
      }
    }
  )
}

exports.fetchComment = fetchComment
