import "./Comments.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lkyksvqmbwigquiebvnu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreWtzdnFtYndpZ3F1aWVidm51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMjkxNjgsImV4cCI6MjA1MzkwNTE2OH0.wkBoQMyiQtIls4WHufxbyW237bIww0LTN5UDHFctd4w"
);

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const { data: commentsData, error: commentsError } = await supabase
        .from("usercomments")
        .select("id, user_id, comment");

      if (commentsError) {
        console.error("Error fetching comments:", commentsError);
        return;
      }

      const userIds = commentsData.map((comment) => comment.user_id);
      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("id, firstName, surname")
        .in("id", userIds); // Use `.in` to filter users by IDs

      if (usersError) {
        console.error("Error fetching users:", usersError);
        return;
      }

      const commentsWithUser = commentsData.map((comment) => {
        const user = usersData.find((user) => user.id === comment.user_id);
        return { ...comment, user };
      });

      setComments(commentsWithUser);
    };

    fetchComments();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      user_id: userId,
      comment,
    };

    const { data, error } = await supabase
      .from("usercomments")
      .insert([formData]);

    if (error) {
      console.error("Error adding comment:", error);
    } else {
      // Update the comments state with the new comment
      const newComment = {
        ...data[0],
        user: { firstName: "New", surname: "User" }, // Placeholder if user data isn't fetched yet
      };
      setComments((prevComments) => [...prevComments, newComment]);
      setComment(""); // Clear the comment input
    }
  };

  return (
    <div className="Comments">
      <h1>Comments</h1>

      <div className="comments-list">
        {comments.length === 0 ? (
          <p>No comments yet!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>
                <strong>
                  {comment.user?.firstName} {comment.user?.surname}
                </strong>
                : {comment.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
