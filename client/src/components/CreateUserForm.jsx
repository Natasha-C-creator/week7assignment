import { useState } from "react";
import "./CreateUserForm.css";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://lkyksvqmbwigquiebvnu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreWtzdnFtYndpZ3F1aWVidm51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMjkxNjgsImV4cCI6MjA1MzkwNTE2OH0.wkBoQMyiQtIls4WHufxbyW237bIww0LTN5UDHFctd4w"
);

export default function CreateUserForm() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [location, setLocation] = useState("");
  const [side, setSide] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      firstName,
      surname,
      location,
      side,
    };

    console.log("Form Data:", formData);

    const { data, error } = await supabase
      .from("users") // Replace with your actual table name
      .insert([formData]);

    if (error) {
      console.error("Error inserting data:", error);
      alert("Error creating user account. Please try again.");
    } else {
      console.log("Form Data:", data); // Logging the inserted data
      alert("Your user account was created!");

      setFirstName("");
      setSurname("");
      setLocation("");
      setSide("");
    }
  };

  // const response = await fetch("http://localhost:8080/UserComments", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(formData),
  // });

  //   if (response.ok) {
  //     alert("Your user account was created!");
  //     setFirstName("");
  //     setSurname("");
  //     setLocation("");
  //     setSide("");
  //   } else {
  //     alert("Error creating user account. Please try again.");
  //   }
  // };

  return (
    <>
      <form
        id="createUserForm"
        className="CreateUserForm"
        onSubmit={handleSubmit}
      >
        <h4> Create User Account </h4>

        <label>
          First Name:
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>

        <label>
          Surname:
          <input
            type="text"
            id="surname"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label htmlFor="side">Which side?</label>
        <select
          id="side"
          name="side"
          value={side}
          onChange={(e) => setSide(e.target.value)}
        >
          <option value="">Please select</option>
          <option value="Bride">Bride</option>
          <option value="Groom">Groom</option>
          <option value="Both">Both</option>
        </select>

        <button type="submit" id="button">
          Submit
        </button>
      </form>
    </>
  );
}
