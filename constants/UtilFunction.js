exports.getStatusObject = function (errorMsg , errorCode , errorStatus) {
    var status = new Object();
    status.errorCode = errorCode;
    status.msg = errorMsg;
    status.errorStatus = errorStatus;
    return status;
}

