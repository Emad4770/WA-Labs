/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function FilmForm({ addFilm, editableFilm, updateFilms, mode, cancel }) {
  const [title, setTitle] = useState(editableFilm ? editableFilm.title : "");
  const [favorite, setFavorite] = useState(
    editableFilm ? editableFilm.favorite : false
  );
  const [watchDate, setWatchDate] = useState(
    editableFilm && editableFilm.watchDate
      ? editableFilm.watchDate.format("YYYY-MM-DD")
      : ""
  );
  const [score, setScore] = useState(editableFilm ? editableFilm.score : 0);
  const [userId, setUserId] = useState(editableFilm ? editableFilm.userId : 1);

  const handleSubmit = (event) => {
    event.preventDefault();
    const film = { title, favorite, watchDate, score, userId };
    if (editableFilm) {
      updateFilms({ id: editableFilm.id, ...film });
    } else {
      addFilm(film);
    }
  };

  return (
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
          value={watchDate}
          onChange={(event) => setWatchDate(event.target.value)}
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
      {mode === "add" && <Button type="submit">Add</Button>}
      {mode === "edit" && <Button type="submit">Save</Button>}{" "}
      <Button onClick={cancel}>Cancel</Button>
    </Form>
  );
}

console.log();

export default FilmForm;
