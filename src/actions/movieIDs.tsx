import { ADD_ID, DELETE_ID } from "./types";

export const addID = (id: string) => ({
  type: ADD_ID,
  data: id,
});

export const deleteID = (id: string) => ({
  type: DELETE_ID,
  data: id,
});
