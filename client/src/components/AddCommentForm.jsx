import "./AddCommentForm.css";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://lkyksvqmbwigquiebvnu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreWtzdnFtYndpZ3F1aWVidm51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMjkxNjgsImV4cCI6MjA1MzkwNTE2OH0.wkBoQMyiQtIls4WHufxbyW237bIww0LTN5UDHFctd4w"
);

export default function AddCommentForm() {
  const [userId, setUserId] = useState("");
  const [comment, setComment] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id, firstName, surname");
      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data);
      }
    };
    fetchUsers();
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

    // const response = await fetch("/UserComments", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });

    if (error) {
      console.error("Error adding comment:", error);
      alert("Error adding comment. Please try again.");
    } else {
      alert("Your comment was added!");

      navigate("/components/Comments");

      setComment("");
    }
  };

  return (
    <form
      id="addCommentForm"
      className="AddCommentForm"
      onSubmit={handleSubmit}
    >
      <h4>Add Comment</h4>
      <select
        id="user-select"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.firstName} {user.surname}
          </option>
        ))}
      </select>

      <textarea
        className="comment"
        placeholder="Write a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      ></textarea>

      <button type="submit" id="button">
        Submit
      </button>
    </form>
  );
}
