/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";

function AddButton(props) {
  return (
    <div className="position-fixed bottom-0 end-0 p-5">
      <Button
        className="btn btn-primary rounded-circle"
        onClick={() => props.addFilm("hello", true, "2023-10-09", 5, 2)}
      >
        <i className="bi bi-plus-lg"></i>
      </Button>
    </div>
  );
}

export default AddButton;
