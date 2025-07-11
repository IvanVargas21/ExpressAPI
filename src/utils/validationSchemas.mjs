// GET - http://localhost:3000/api/users?filter=username&value=ivan
export const getUserByValueAndFilterValidationSchema = {
  filter: {
    isString: {
      errMessage: 'Must be a string'
    },
    notEmpty: {
      errMessage: 'Must be a non-empty string'
    },
    isLength: {
      options: {
        min: 3,
        max: 10
      },
      errMessage: 'Must be at least 3-10 characters'
    },
  },
  value: {
    notEmpty: {
      errMessage: 'Value cannot be empty'
    }
  }
}
// POST - http://localhost:3000/api/users
export const createUserValidationSchema = {
  username: {
    notEmpty: {
      errMessage: 'Username cannot be empty'
    },
    isLength:{
      options: {
        min: 5,
        max: 32
      },
      errMessage: "Username must be atleast 5 characters with a max of 32 characters"
    },
    isString: {
      errMessage: "Username must be a string!"
    },

  },
  displayName: {
    notEmpty: {
      errMessage: 'Display name cannot be empty'
    }
  }
}

// PUT- http://localhost:3000/api/users/:id
export const putUserValidationSchema = {
    username: {
    in: ['body'],
    notEmpty: {
      errMessage: 'Username cannot be empty'
    },
    isLength:{
      options: {
        min: 4,
        max: 32
      },
      errMessage: "Username must be atleast 4 characters with a max of 32 characters"
    },
    isString: {
      errMessage: "Username must be a string!"
    },

  },
  displayName: {
    in: ['body'],
    notEmpty: {
      errMessage: 'Display name cannot be empty'
    }
  }
}

export const patchUserValidationSchema = {
    username: {
    in: ['body'],
    isLength:{
      options: {
        min: 4,
        max: 32
      },
      errMessage: "Username must be atleast 4 characters with a max of 32 characters"
    },
    isString: {
      errMessage: "Username must be a string!"
    },

  },
  displayName: {
    in: ['body'],
    isLength:{
      options: {
        min: 4,
        max: 32
      },
      errMessage: "Display name must be atleast 4 characters with a max of 32 characters"
    },
    isString: {
      errMessage: "Username must be a string!"
    },
  }
}