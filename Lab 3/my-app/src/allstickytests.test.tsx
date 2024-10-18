import { render, screen, fireEvent } from "@testing-library/react";
import { MyStickyNotes } from "./MyStickyNotes";
import { dummyNotesList } from "./constants";
import { Label } from "./types";

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
 }), 

 test("what you put in form matches what is in the sticky note", () => {
  render(<MyStickyNotes />);

  const titleInput = screen.getByPlaceholderText("Note Title");
  const contentInput = screen.getByPlaceholderText("Note Content");
  const dropdown = screen.getByTestId("note-label-dropdown");
  const createNoteButton = screen.getByText("Create Note");

  fireEvent.change(titleInput, { target: { value: "Test Note" } });
  fireEvent.change(contentInput, { target: { value: "Test Content" } });
  fireEvent.change(dropdown, { target: { value: Label.study } });
  fireEvent.click(createNoteButton);

  expect(screen.getByText("Test Note")).toBeInTheDocument();
  expect(screen.getByText("Test Content")).toBeInTheDocument();
  expect(screen.getByText("Study")).toBeInTheDocument();
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
  }), 
  //ensures rest of the ntoes are intact. this was added by me
  test("leaves other non-deleted notes intact", () => {
    render(<MyStickyNotes/>);
    for (let i = 0; i < dummyNotesList.length - 1; i++) {
      const firstNoteTitle = screen.getByText(dummyNotesList[i].title);
      expect(firstNoteTitle).toBeInTheDocument();
  
      // notes apparently reorder after deleting so always delete the first note
      fireEvent.click(screen.getAllByText("x")[0]);
  
      // cant use getByText because it is deleted so would result in error
      expect(screen.queryByText(dummyNotesList[i].title)).not.toBeInTheDocument();
  
      //check all following notes exist
      for (let j = i + 1; j < dummyNotesList.length; j++) {
        const remainingNoteTitle = screen.getByText(dummyNotesList[j].title);
        expect(remainingNoteTitle).toBeInTheDocument();
      }
    }
  });
});


