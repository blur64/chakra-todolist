import tasksReducer from "./reducer";
import { actionTypes } from "../constants";

const initialTestTasks = [
  { id: 2, text: "third task text", isCompleted: false },
  { id: 1, text: "second task text", isCompleted: true },
  { id: 0, text: "first task text", isCompleted: false },
];

describe("Tasks reducer", () => {
  let tasks = initialTestTasks;

  beforeEach(() => tasks = initialTestTasks);

  it("should add task", () => {
    /*
    * Check count - reducer must add only one item into array
    * Check position - new item should be added at the start of the array
    * Prove that positions of old items relative to each other weren't change
    * Prove that added item is a task. In other words, added item should
    contain only those properties, that a task has, and theese properties
    should have correct types.
    * Check that task properties have expected values
    */

    const newTasks = tasksReducer(tasks, {
      type: actionTypes.ADD_ONE,
      payload: { text: "fourth task text" },
    });

    // should add only one item
    expect(newTasks.length - tasks.length).toBe(1);

    // shouldn't change positions of old items relative to each other
    const idsOfTasks = tasks.map(t => t.id);
    const idxOfFirstItem = newTasks.findIndex(t => t.id === idsOfTasks[0]);
    const idsOfOldItemsInNew = newTasks.slice(idxOfFirstItem, idsOfTasks.length + 1).map(t => t.id);
    expect(idsOfTasks.every((id, idx) => id === idsOfOldItemsInNew[idx])).toBe(true);

    // should add it at the start
    const idOfLastItemInTasks = tasks.at(-1).id;
    const idOfLastItemInNewTasks = newTasks.at(-1).id;
    expect(idOfLastItemInTasks === idOfLastItemInNewTasks).toBe(true);

    // item must be a task
    const item = newTasks[0];
    const id = item.id;
    const text = item.text;
    const isCompleted = item.isCompleted;
    expect(typeof id === "number" &&
      typeof text === "string" &&
      typeof isCompleted === "boolean").toBe(true);

    // every task's prop must has expected value
    expect(id === 3 && text === "fourth task text" && isCompleted === false)
      .toBe(true);
  });

  it("should remove task", () => {
    /*
    * Check count - reducer must remove only one item from array
    * Prove that reducer deleted task having passed id
    * Prove that position of every item, which was before removed item, 
    wasn't changed, and position of leftover items was decreased by 1
    */

    const newTasks = tasksReducer(tasks, {
      type: actionTypes.REMOVE_ONE,
      payload: { id: 1 },
    });

    // should remove only one item
    expect(tasks.length - newTasks.length).toBe(1);

    // deleted needed task
    expect(newTasks.find(t => t.id === 1)).toBe(undefined);

    // should correctly change indexes of other items
    const deletedIndex = tasks.findIndex(t => t.id === 1);
    const oldIndexesMap = tasks.map((t, idx) => ([t.id, idx]));
    const newIndexesMap = newTasks.map((t, idx) => ([t.id, idx]));

    expect(oldIndexesMap.every(([oldId, oldIdx]) => {
      if (oldIdx < deletedIndex) {
        return newIndexesMap.find(m => m[0] === oldId)[1] === oldIdx;
      } else if (oldIdx > deletedIndex) {
        return newIndexesMap.find(m => m[0] === oldId)[1] === oldIdx - 1;
      } else {
        return true;
      }
    })).toBe(true);
  });

  it("should toggle completeness of a task", () => {
    /* 
    * Prove that task completeness prop was toggled
    * Prove that completeness prop of other tasks wasn't changed 
    */

    const newTasks = tasksReducer(tasks, {
      type: actionTypes.TOGGLE_ONE_COMPLETENESS,
      payload: { id: 2 },
    });

    // should toggle completeness of needed task
    expect(newTasks.find(t => t.id === 2).isCompleted ===
      !tasks.find(t => t.id === 2).isCompleted).toBe(true);

    // shouldn't change completeness of other tasks
    expect(tasks.every((t, idx) => {
      if (t.id !== 2) {
        return newTasks[idx].isCompleted === t.isCompleted
      }
      return true;
    })).toBe(true);
  });

  it("should update text of a task", () => {
    /* 
    * Prove that task text prop was changed
    * Prove that text prop of other tasks wasn't changed
    */

    const newTasks = tasksReducer(tasks, {
      type: actionTypes.UPDATE_ONE_TEXT,
      payload: { text: "super text", id: 2 },
    });

    // should update text of needed task
    expect(newTasks.find(t => t.id === 2).text === "super text").toBe(true);

    // shouldn't change text of other tasks
    expect(tasks.every((t, idx) => {
      if (t.id !== 2) {
        return newTasks[idx].text === t.text;
      }
      return true;
    })).toBe(true);
  });

  it("should remove all tasks", () => {
    /* 
    * Prove that tasks array is empty
    */

    const newTasks = tasksReducer(tasks, { type: actionTypes.CLEAN_ALL });

    // should return empty array
    expect(newTasks.length).toBe(0);
  });

  it("should remove all completed tasks", () => {
    /* 
    * Prove that all uncompleted tasks are in array
    * Prove that array length equals count of all uncompleted tasks before
    */

    const newTasks = tasksReducer(tasks, { type: actionTypes.CLEAN_COMPLETED });

    // should return array only with uncompleted tasks
    expect(newTasks.every(t => !t.isCompleted)).toBe(true);

    // returned array length should equal count of uncompleted tasks before
    const countOfUncompleted = tasks.filter(t => !t.isCompleted).length;
    expect(countOfUncompleted === newTasks.length).toBe(true);
  });

  it("should remove all uncompleted tasks", () => {
    /* 
    * Prove that all completed tasks are in array
    * Prove that array length equals count of all completed tasks before
    */

    const newTasks = tasksReducer(tasks, { type: actionTypes.CLEAN_ACTIVE });

    // should return array only with completed tasks
    expect(newTasks.every(t => t.isCompleted)).toBe(true);

    // returned array length should equal count of completed tasks before
    const countOfCompleted = tasks.filter(t => t.isCompleted).length;
    expect(countOfCompleted === newTasks.length).toBe(true);
  });
});