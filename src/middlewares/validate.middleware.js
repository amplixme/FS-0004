import { ZodError } from 'zod';
import {error} from '../utils/response.js';

export const validate = (schema) => (req, res, next) => {
	try{
	    req.body = schema.parse(req.body);
        next();
	}catch(err){
	    if(err instanceof ZodError){
	        const message = err.issues.map((e) => e.message).join(', ');
	        return error(res, message, 400);
	    }
	    next(err);
	}    
}	