import "./Form.css";

export default function Form(props) {
  return (
    <>
      <h1 className="title">{props.title}</h1>
      <h3 className="content">{props.content}</h3>
      <div className="button-container">{props.children}</div>
      <form className="Form">
        <label>
          Full Name:
          <input type="text" />
          <label>
            Location:
            <input type="text" />
          </label>
        </label>
        <label htmlFor="side">Which side?</label>
        <select id="side" name="side">
          <option value="">Please select</option>
          <option value="Bride">Bride</option>
          <option value="Groom">Groom</option>
          <option value="Both">Both</option>
        </select>
        <label>
          Comments:
          <input type="text" />
        </label>
        {/* <form ref="form" onSubmit={this.handleSubmit}> */}
        <button type="submit" id="button">
          Submit
        </button>
      </form>
    </>
  );
}
