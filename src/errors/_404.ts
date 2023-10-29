import { Request, Response, NextFunction } from 'express';

import { NotFoundError } from './customErrors';

export class _404 {
  static notFound(req: Request, res: Response, next: NextFunction) {
    throw new NotFoundError(
      `Can't find ${req.originalUrl}, ensure you have the correct URL`
    );
  }
}
