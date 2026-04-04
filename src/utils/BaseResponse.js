export default class BaseResponse {
    constructor(success,message,data=null,error= null){
        this.success = success;
        this.message = message;
        this.data = data;
        this.error =error;
        this.timestamp = new Date().toISOString();
    }
    static success(message, data = null) {
        return new BaseResponse(true, message, data);
    }

    static error(message, error = null) {
        return new BaseResponse(false, message, null, error);
    }
}