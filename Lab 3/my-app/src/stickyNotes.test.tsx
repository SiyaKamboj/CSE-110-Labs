import { render, screen, fireEvent } from "@testing-library/react";
import { MyStickyNotes } from "./MyStickyNotes";
test("renders create note form", () => {
 render(<MyStickyNotes />);
 const createNoteButton = screen.getByText("Create Note");
 expect(createNoteButton).toBeInTheDocument();
});


