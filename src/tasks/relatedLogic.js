export function calcCompletenessPercentage(tasks) {
  return tasks.length ?
    Math.round(tasks.filter(t => t.isCompleted).length / tasks.length * 100) :
    0;
}