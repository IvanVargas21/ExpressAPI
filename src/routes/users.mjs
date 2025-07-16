import { Router } from 'express';
import {
    query, 
    validationResult, 
    body,
    matchedData,
    checkSchema
} from 'express-validator'
const router = Router();
import { mockUsers } from '../utils/constants.mjs'
import {
    createUserValidationSchema, getUserByValueAndFilterValidationSchema,
    putUserValidationSchema,
    patchUserValidationSchema
} from '../utils/validationSchemas.mjs'
import { resolveIndexByUserId } from '../middleware/middlewares.mjs';

// GET all users
router.get("/api/users",
    query("filter")
      .isString()
      .notEmpty()
      .withMessage("Must not be empty")
      .isLength({ min: 2, max: 15})
      .withMessage("Must be at least 3-10 characters"),
      (req, res) => {
        const result = validationResult(req);
        console.log(result);
        const {
          query: { filter, value }
        } = req;
        if(filter && value)
          return res.send(
            mockUsers.filter((user) => user[filter].includes(value))
          )
        return res.send(mockUsers);
      }
)
// GET user by id
router.get('/api/users/:id', resolveIndexByUserId, (req, res) => { 
    const { findUserIndex } = req;
    const findUser = mockUsers[findUserIndex];
    if(!findUser) return res.status(404).send({msg: 'User not found'});
    res.send(findUser);
})
// POST - request to create a new user
router.post(
    '/api/users',
    checkSchema(createUserValidationSchema),
    (req, res) => {    
        console.log(req.body);
        const result = validationResult(req);
        console.log(result);

        if(!result.isEmpty())
            return res.status(400).send({ errors: result.array() });

        const data = matchedData(req);
        const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data}
        mockUsers.push(newUser);
        return res.status(201).send(newUser);
    }
)
// PATCH - req to update a user partially
router.patch(
  '/api/users/:id',
    checkSchema(patchUserValidationSchema),
    resolveIndexByUserId, 
    (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()) {
        console.log(result);
        return res.status(400).send({ errors: result.array()})
    }
    const { body, findUserIndex } = req;
    mockUsers[findUserIndex] = {
        ...mockUsers[findUserIndex],
        ...body
    };
    return res.status(200).send(mockUsers[findUserIndex]);
})
// PUT - request to update a user
router.put(
  '/api/users/:id',
      checkSchema(putUserValidationSchema),
      resolveIndexByUserId, 
      (req, res) => {
      const result = validationResult(req);
      if(!result.isEmpty()){
          console.log(result);
          return res.status(400).send({ errors: result.array() });
      }
      const { body, findUserIndex} = req;
  
      mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
      return res.status(200).send(mockUsers[findUserIndex]);
  }
)
// DELETE - request to delete a user
router.delete('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req;
    const deletedUser = mockUsers[findUserIndex];
    // splice(start, deleteCount, item1, ite2, ...)
    mockUsers.splice(findUserIndex, 1);

    res.status(200).send({ msg: `User ${deletedUser.displayName} has been deleted successfully` });
})
export default router;