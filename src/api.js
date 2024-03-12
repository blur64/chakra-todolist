const TASKS_LOCAL_STORAGE_KEY = "chakra-todolist-tasks";

export function getTasks() {
  return JSON.parse(localStorage.getItem(TASKS_LOCAL_STORAGE_KEY)) || [];
}

export function saveTasks(tasks) {
  localStorage.setItem(TASKS_LOCAL_STORAGE_KEY, JSON.stringify(tasks));
}