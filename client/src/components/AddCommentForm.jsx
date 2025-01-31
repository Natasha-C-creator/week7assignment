import "./AddCommentForm.css";

export default function AddCommentForm(props) {
  return (
    <>
      <h1 className="title">{props.title}</h1>
      <h3 className="content">{props.content}</h3>
      <div className="button-container">{props.children}</div>
      <form id="addCommentForm" className="AddCommentForm">
        <h4> Add Comments </h4>
        <select id="user-select"></select>
        <textarea
          className="comment"
          placeholder="Write a comment"
          required
        ></textarea>
        {/* <form ref="form" onSubmit={this.handleSubmit}> */}
        <button type="submit" id="button">
          Submit
        </button>
      </form>
    </>
  );
}
