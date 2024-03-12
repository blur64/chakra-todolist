function validateTaskText(text) {
  const textType = typeof text;
  if (textType !== "string") {
    throw new TypeError(`Unexpected type of task text: ${textType}`);
  } else if (!text.length) {
    throw new Error(`Empty task text is not allowed`);
  }
}

function validateTaskId(id) {
  const idType = typeof id;
  if (idType !== "number") {
    throw new TypeError(`Unexpected type of task id: ${idType}`);
  } else if (id <= 0) {
    throw new Error(`Task id must be more than 0`);
  }
}

export const actionTypes = {
  ADD_ONE: 0,
  REMOVE_ONE: 1,
  TOGGLE_ONE_COMPLETENESS: 2,
  UPDATE_ONE_TEXT: 3,
  CLEAN_ALL: 4,
  CLEAN_ACTIVE: 5,
  CLEAN_COMPLETED: 6,
};

export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case actionTypes.ADD_ONE: {
      const { text, id } = action.payload;
      validateTaskText(text);
      return [{ id, text, isCompleted: false }, ...tasks];
    };
    case actionTypes.REMOVE_ONE: {
      const { id } = action.payload;
      validateTaskId(id);
      return tasks.filter(t => t.id !== id);
    };
    case actionTypes.TOGGLE_ONE_COMPLETENESS: {
      const { id } = action.payload;
      validateTaskId(id);
      return tasks.map(t => t.id === id ?
        { ...t, isCompleted: !t.isCompleted } : t);
    };
    case actionTypes.UPDATE_ONE_TEXT: {
      const { text, id } = action.payload;
      validateTaskText(text);
      validateTaskId(id);
      return tasks.map(t => t.id === id ? { ...t, text } : t);
    };
    case actionTypes.CLEAN_ALL:
      return [];
    case actionTypes.CLEAN_ACTIVE:
      return tasks.filter(t => t.isCompleted);
    case actionTypes.CLEAN_COMPLETED:
      return tasks.filter(t => !t.isCompleted);
    default:
      new TypeError(`Unexpected action type: ${action.type}`);
  }
}