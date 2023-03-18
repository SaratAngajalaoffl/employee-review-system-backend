export const sendSuccessResponse = (res, data, message = "Success") => {
    res.status(200).json({
        data: data,
        status: true,
        message: message,
    });
};

export const sendErrorResponse = (
    res,
    errors,
    message = "Something Went Wrong",
    status = 406
) => {
    res.status(status).json({
        data: errors,
        status: false,
        message: message,
    });
};

export const sendEmptyResponse = (res, data) => {
    res.status(204).json({
        data: data,
        status: false,
        message: "No Data",
    });
};
