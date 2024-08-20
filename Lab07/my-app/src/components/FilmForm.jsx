import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function FilmForm() {
  const [title, setTitle] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [date, setDate] = useState("");
  const [score, setScore] = useState(0);
  return (
    <Form>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          required={true}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="checkbox"
          id="Favorite"
          label="Favorite"
          checked={favorite}
          onChange={(event) => setFavorite(event.target.checked)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Score</Form.Label>
        <Form.Control
          type="number"
          min="0"
          max="5"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>User Id</Form.Label>
        <Form.Control />
      </Form.Group>
      <br />
      <Button>Add</Button> <Button>Cancel</Button>
    </Form>
  );
}

console.log();

export default FilmForm;
