/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function FilmForm({ addFilm, mode, setMode }) {
  const [title, setTitle] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [date, setDate] = useState("");
  const [score, setScore] = useState(0);
  const [userId, setUserId] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    const film = { title, favorite, date, score, userId };
    addFilm(film);
  };

  return (
    mode == "add" && (
      <Form onSubmit={handleSubmit}>
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
          <Form.Control
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required={true}
          />
        </Form.Group>
        <br />
        <Button type="submit">Add</Button>{" "}
        <Button onClick={() => setMode("view")}>Cancel</Button>
      </Form>
    )
  );
}

console.log();

export default FilmForm;
