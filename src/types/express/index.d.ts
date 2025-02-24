import { JwtPayload } from 'jsonwebtoken';
import { DecodedToken } from '@/interfaces/context.interfaces';

declare module 'express-serve-static-core' {
    interface Request {
        context?: DecodedToken;
    }
}
