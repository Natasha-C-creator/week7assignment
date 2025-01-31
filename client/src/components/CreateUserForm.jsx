import "./CreateUserForm.css";

export default function CreateUserForm(props) {
  return (
    <>
      <h1 className="title">{props.title}</h1>
      <h3 className="content">{props.content}</h3>
      <div className="button-container">{props.children}</div>
      <form className="CreateUserForm">
        <label>
          First Name:
          <input type="text" />
        </label>
        <label>
          Surname:
          <input type="text" />
        </label>
        <label>
          Location:
          <input type="text" />
        </label>
        <label htmlFor="side">Which side?</label>
        <select id="side" name="side">
          <option value="">Please select</option>
          <option value="Bride">Bride</option>
          <option value="Groom">Groom</option>
          <option value="Both">Both</option>
        </select>
        {/* <form ref="form" onSubmit={this.handleSubmit}> */}
        <button type="submit" id="button">
          Submit
        </button>
      </form>
    </>
  );
}
