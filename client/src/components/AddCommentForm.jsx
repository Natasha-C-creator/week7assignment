import "./AddCommentForm.css";
import { useEffect, useState } from "react";

export default function AddCommentForm() {
  const [userId, setUserId] = useState("");
  const [comment, setComment] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/Users");
      const data = await response.json();
      setUsers(data); // Set the fetched users
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      userId,
      comment,
    };

    const response = await fetch("/UserComments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Your comment was added!");
      setComment(""); // Reset the form fields
    } else {
      alert("Error adding comment. Please try again.");
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
            {user.first_name} {user.surname}
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

//     </form>

//       <h1 className="title">{props.title}</h1>
//       <h3 className="content">{props.content}</h3>
//       <div className="button-container">{props.children}</div>
//       <form id="addCommentForm" className="AddCommentForm">
//         <select id="user-select"></select>
//         <textarea
//           className="comment"
//           placeholder="Write a comment"
//           required
//         ></textarea>
//         {/* <form ref="form" onSubmit={this.handleSubmit}> */}
//         <button type="submit" id="button">
//           Submit
//         </button>
//       </form>
//     </>
//   );
// }
