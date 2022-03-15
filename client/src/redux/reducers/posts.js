import { FETCH, CREATE, UPDATE, DELETE, LIKE } from "../types/Types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {
  switch (action.type) {
    case FETCH:
      return action.payload;
    case CREATE:
      return [action.payload, ...posts];
    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    default:
      return posts;
  }
};
