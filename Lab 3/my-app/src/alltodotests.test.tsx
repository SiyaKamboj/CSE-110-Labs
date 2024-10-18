import { render, screen, fireEvent } from "@testing-library/react";
import { dummyGroceryList } from "./constants";
import { ToDoList } from "./toDoList";

//test to see if all sticky notes are getting displayed
describe("Display all items from list", () => {
    test("renders all items from List", () => {
      render(<ToDoList />);
  
      //loop through aech dummy note to see if it rendered
      dummyGroceryList.forEach(item => {
        const noteName = screen.getByText(item.name);
  
        expect(noteName).toBeInTheDocument();
      });
    });
});

//test to see if # of todo list items are getting changed
describe("Check # of todolist items", () => {
    test("check # of todolist items", () => {
      render(<ToDoList />);
  
        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();

        const checkboxes = screen.getAllByRole("checkbox");

        fireEvent.click(checkboxes[1]); 
        expect(screen.getByText("Items bought: 1")).toBeInTheDocument();

        fireEvent.click(checkboxes[1]); 
        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();

        fireEvent.click(checkboxes[0]); 
        expect(screen.getByText("Items bought: 1")).toBeInTheDocument();
        
    });
});


