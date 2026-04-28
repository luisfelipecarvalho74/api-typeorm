export class ApiError extends Error {
    public readonly statusCode: number
    public readonly errors: unknown
    

    constructor (message: string, statusCode: number, errors?: unknown) {
        super (message)
        this.statusCode = statusCode
        this.errors = errors
    }   
}

export class BadRequestError extends ApiError {
    constructor(message: string, errors?: unknown) {
      super(message, 400);
    }
  }
  
  export class NotFoundError extends ApiError {
    constructor(message: string) {
      super(message, 404);
    }
  }