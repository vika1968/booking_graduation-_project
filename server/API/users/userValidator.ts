

import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore);

export const UserValidation = Joi.object({  
email: Joi.string().email().required(),
password: joiPassword
    .string()
    .min(6)      
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)  
    .required()
  });


 
