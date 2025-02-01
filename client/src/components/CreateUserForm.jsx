import { useState } from "react";
import "./CreateUserForm.css";

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

    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Your user account was created!");
      setFirstName("");
      setSurname("");
      setLocation("");
      setSide("");
    } else {
      alert("Error creating user account. Please try again.");
    }
  };

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
