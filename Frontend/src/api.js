import { API_URL } from "./utils.jsx";

/******************Create a Task********************/
export const createTask = async (taskObj) => {
  const url = `${API_URL}/tasks`;

  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObj),
  };

  try {
    const result = await fetch(url, option);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};


/***************Display(fetch) the task*****************/
export const getAllTasks = async () => {
  const url = `${API_URL}/tasks`;

  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const result = await fetch(url, option);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

/*****************Delete The Task******************/
export const deleteTasksById = async (id) => {
  const url = `${API_URL}/tasks/${id}`;

  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const result = await fetch(url, option);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

/********************Update The Task********************/
export const UpdateTasksById = async (id, reqBody) => {
  const url = `${API_URL}/tasks/${id}`;

  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody)
  };

  try {
    const result = await fetch(url, option);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};
