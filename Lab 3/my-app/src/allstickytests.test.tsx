import { render, screen, fireEvent } from "@testing-library/react";
import { MyStickyNotes } from "./MyStickyNotes";
import { dummyNotesList } from "./constants";

describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<MyStickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<MyStickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });
});


//test to see if all sticky notes are getting displayed
describe("Display StickyNotes from constants.ts", () => {
  test("renders all notes from dummyNotesList", () => {
    render(<MyStickyNotes />);

    //loop through aech dummy note to see if it rendered
    dummyNotesList.forEach(note => {
      const noteTitle = screen.getByText(note.title);
      const noteContent = screen.getByText(note.content);

      expect(noteTitle).toBeInTheDocument();
      expect(noteContent).toBeInTheDocument();
    });
  });
});

//check if stickynote getting deleted
describe("Update StickyNote", () => {
  test("updates a note's innerHTML after an edit", () => {
    render(<MyStickyNotes />);

    let index=0;
    dummyNotesList.forEach(note => {
      const noteTitleElement = screen.getByTestId(`note-title-${dummyNotesList[index].id}`);
      const noteContentElement = screen.getByTestId(`note-content-${dummyNotesList[index].id}`);

      expect(noteTitleElement).toHaveTextContent(dummyNotesList[index].title);
      expect(noteContentElement).toHaveTextContent(dummyNotesList[index].content);

      fireEvent.input(noteTitleElement, { target: { innerHTML: "Updated Note Title" } });
      fireEvent.input(noteContentElement, { target: { innerHTML: "Updated Note Content" } });

      expect(noteTitleElement).toHaveTextContent("Updated Note Title");
      expect(noteContentElement).toHaveTextContent("Updated Note Content");
      index++;
    });
  });
});

//test to see if sticky notes are getting deleted properly
describe("Delete StickyNote", () => {
  test("removes a note when the delete button is clicked", () => {
    render(<MyStickyNotes />);
    //get all delete buttons
    const deleteButtons = screen.getAllByText("x"); 
    let index=0;
    dummyNotesList.forEach(note => {
      const noteToDeleteTitle = screen.getByText(dummyNotesList[index].title); 
      const noteToDeleteContent = screen.getByText(dummyNotesList[index].content); 
      expect(noteToDeleteTitle).toBeInTheDocument();
      expect(noteToDeleteContent).toBeInTheDocument();
      fireEvent.click(deleteButtons[index]); 
      expect(screen.queryByText(dummyNotesList[index].title)).not.toBeInTheDocument();
      expect(screen.queryByText(dummyNotesList[index].content)).not.toBeInTheDocument();
      index++;
    });
  });
});

