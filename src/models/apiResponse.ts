export enum ErrorMsg {
    General_DatabaseError = 'General_DatabaseError',
    General_NotFoundError = 'General_NotFound',
    General_InternalServerError = 'General_InternalServerError',
    General_MissingRequiredData = 'General_MissingRequiredData',
    General_InsufficientPermissions = 'General_InsufficientPermissions',
    General_BadRequest = 'BadRequest',
    Auth_InvalidToken = 'Auth_InvalidToken',
    Auth_MissingToken = 'Auth_MissingToken',
    Auth_InvalidCredential = 'Auth_InvalidCredential',
    Product_MissingId = 'Product_MissingId',
    Product_NotExist = 'Product_NotExist',
    Product_MissingPrice = 'Product_MissingPrice',
    Product_MissingName = 'Product_MissingName',
    Product_MissingCategory = 'Product_MissingCategory',
    User_MissingId = 'User_MissingId',
    User_MissingFirstName = 'User_MissingFirstName',
    User_MissingLastName = 'User_MissingLastName',
    User_MissingEmail = 'User_MissingEmail',
    User_MissingPassword = 'User_MissingPassword',
    User_MissingRole = 'User_MissingRole',
    User_EmailIsAlreadyExist = 'User_EmailIsAlreadyExist',
    User_EmailIsNotExist = 'User_EmailIsNotExist',
    Order_MissingUserId = 'Order_MissingUserId',
    Order_MissingOrderId = 'Order_MissingOrderId',
    Order_MissingProductId = 'Order_MissingOrderId',
    Order_MissingQuantity = 'Order_MissingQuantity',
    Order_MissingProductStatus = 'Order_MissingProductStatus',
    Order_InvalidProductStatus = 'Order_InvalidProductStatus',
    Order_UserIdNotExist = 'Order_UserIdNotExist',
    Order_ProductIdNotExist = 'Order_ProductIdNotExist',
    Order_MissingBranch = 'Order_MissingBranch',
    Order_InvalidBranch = 'Order_InvalidBranch',
    Order_OrderIdNotExist = 'Order_OrderIdNotExist',
}

export enum ErrorCode {
    BadRequestError = 400,
    UnauthorizedError = 401,
    NotFoundError = 404,
    InternalServerError = 500,
}

export interface ErrorResponse {
    errorCode: ErrorCode;
    errorMessage: ErrorMsg | string;
}

export class ApiError {
    static httpResponse(message: ErrorMsg, errorCode: ErrorCode): ErrorResponse {
        return { errorCode: errorCode, errorMessage: message };
    }
}

export enum SuccessCode {
    With_Content = 200,
    No_Content = 204,
}
