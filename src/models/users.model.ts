import mongoose from "mongoose";
import Joi from 'Joi';


export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 100
},
email: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 255
},
password: {
    type: String,
    required: true,
    min: 8,
    max: 100

},
is_admin: {
  type: Boolean,
  required: true,
},
is_enabled: {
  type: Boolean,
  required: true,
}
});

export function validateUser(user: any) {
  const schema = Joi.object({
      name: Joi.string().min(3).max(100).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(8).max(100).required(),
      is_admin: Joi.boolean(),
      is_enabled: Joi.boolean().default(true)
  })
  return schema.validate(user)
}

// Create a Mongoose model called "UserModel" based on the userSchema
export const userModel = mongoose.model("users", userSchema);

export default userModel;