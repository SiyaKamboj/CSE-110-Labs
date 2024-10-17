import React, { useContext, useState } from 'react';
import './App.css';
import { Label, Note } from "./types";
import { dummyNotesList } from "./constants";
import { themes, ThemeContext } from './themeContext';
import clearheart from './images/clearheart.png';
import redheart from './images/redheart.png';

export const MyStickyNotes = () => {
  const [TitlebgColor, setTitleBgColor] = useState("");
  const [ContentbgColor, setContentBgColor] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const [notes, setNotes] = useState(dummyNotesList); 
  const [removedNotes, setRemovedNotes] = useState<string[]>([]);


  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);



  const toggleTheme = () => {
    const newTheme = currentTheme === themes.light ? themes.dark : themes.light;
    setCurrentTheme(newTheme);

    // Change the body background color to match the current theme
    document.body.style.backgroundColor = newTheme.background;
  };

  const likeHandler = (title: string) => () => {
    if (!favorites.includes(title)) {
      setFavorites((favorites) => [...favorites, title]);
    } else {
      setFavorites((favorites) => favorites.filter((item) => item !== title));
    }
  };

   // Function to handle the form submission
   const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload
    console.log("createNoteHandler called");

    // Create a new note object with a unique id
    const newNote = {
      ...createNote,
      id: notes.length + 1,  // Generate an id based on the length of the current notes
    };

    // Add the new note to the notes list
    setNotes([...notes, newNote]);
    
    // Reset the createNote state to clear the form
    setCreateNote(initialNote);
  };

  //handle changing color of boxes
  const handleFocus = () => {
    setTitleBgColor("#e0f7fa"); // Set background color on focus
  };

  const handleBlur = () => {
    setTitleBgColor(""); // Reset background color on blur
  };

  const handleContentFocus = () => {
    setContentBgColor("#e0f7fa"); // Set background color on focus
  };

  const handleContentBlur = () => {
    setContentBgColor(""); // Reset background color on blur
  };


  return (
    <div className="app-container" style={{ background: currentTheme.background, color: currentTheme.foreground}}>
      <form className="note-form">
        <div><input style={{ backgroundColor: TitlebgColor }} onFocus={handleFocus}
        onBlur={handleBlur} placeholder="Note Title" onChange={(event) =>
          	setCreateNote({ ...createNote, title: event.target.value })}
        required /></div>

        <div><input style={{ backgroundColor: ContentbgColor }} onFocus={handleContentFocus}
        onBlur={handleContentBlur} type="text" id="content" onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
        name="content" placeholder="Note Content" required /></div>

        <select name="noteLabel" onChange={(event) =>
         	setCreateNote({ ...createNote, label: event.target.value as Label})}
          id="noteLabel">
          <option value={Label.personal}>Personal</option>
          <option value={Label.study}>Study</option>
          <option value={Label.work}>Work</option>
          <option value={Label.other}>Other</option>
        </select>

        <div><button onClick={(e) => createNoteHandler(e)} type="submit">Create Note</button></div>
      </form>

      <div className="notes-grid">
        {notes.map(note => (
          <div style={{color: "black"}}key={note.id} className="note-item">
            <div className="notes-header">
              <button onClick={likeHandler(note.title)}>
                <img src={favorites.includes(note.title) ? redheart : clearheart} alt="heart icon" width="12px" />
              </button>
              <button onClick={() => setNotes((notes) => notes.filter((item) => item.title !== note.title)) }>x</button>
            </div>
            <h2 contentEditable data-testid={`note-title-${note.id}`}>{note.title}</h2>
            <p contentEditable data-testid={`note-content-${note.id}`}>{note.content}</p>
            <p contentEditable data-testid={`note-label-${note.id}`}>{note.label}</p>
          </div>
        ))}
      </div>

      {/* Theme Toggle Button */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>

      <div>
        <h1>Your favorites:</h1>
        {favorites.map(currFav => (
          <p key={currFav}>{currFav}</p>
        ))}
      </div>
    </div>
  );
}

