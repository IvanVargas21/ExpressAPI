import { mockUsers } from "../utils/constants.mjs";
export const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next(); // continues to route handlers
}

export const resolveIndexByUserId = (req, res, next) => {
    const {
    params: { id }
  } = req;
  // string to numeric conversion
  const parsedId = parseInt(id);
  if(isNaN(parsedId)) return res.status(400).send({msg: 'Bad Request! Invalid Id'});
  // findIndex() returns the index of the first element that passes the condition
  const findUserIndex = mockUsers.findIndex(
    (user) => user.id === parsedId
  )
  if(findUserIndex === -1) return res.status(404).send({msg: 'User not found'});

  req.findUserIndex = findUserIndex; // stores the index of the user in the request object
  next();
}