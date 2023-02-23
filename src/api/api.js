import Axios from 'axios';


const API = 'https://localhost:7115/api/v1/';




/**
 * Description: Hàm để get dữ liệu không tham số. 
 * created : tvTam (22/02/2023)
 */
 export const get = async(route = '' ,success, errorHandler) => {
    return await Axios.get(API + route).then(
        (response) => success(response)

    ).catch(error => {
        errorHandler(error);
    })
} 
/** 
 * Description: Hàm để get dữ liệu có tham số.
 * created : tvTam (22/02/2023)
 */
export const getByFilter = async(route = '',param ,success, errorHandler) => {
        return await Axios.get(API + route, {params: param}).then(
            (response) => success(response)

        ).catch(error => {
            errorHandler(error);
        })
}
/**
 * Description: Hàm để get dữ liệu có tham số nhưng được gán vào link. * 
 * created : tvTam (22/02/2023)
 */
export const getById = async(route = '',param ,success, errorHandler) => {
    return await Axios.get(API + route + `/${param}`).then(
        (response) => success(response)
    ).catch(error => {
        errorHandler(error);
    })
}
/** 
 * Description: Hàm để post dữ liệu lên. 
 * created : tvTam (22/02/2023)
 */
export const post= async(route = '', data, success, errorHandler) =>{
    return await Axios.post(API + route, data).then((response) =>success(response)).catch((error) => errorHandler(error));
}

/**
 * Description: Hàm để put để thay đổi dữ liệu của một bản ghi nhất định.
 * created : tvTam (22/02/2023)
 */
export const put  = async(route = '', data, success, errorHandler) =>{
    return await Axios.put(API + route , data).then((response) =>success(response)).catch((error) => errorHandler(error));
}

/**
 * Description: Hàm xóa dữ liệu dựa trên tham số đàu vào.
 * created : tvTam (22/02/2023)
 */
export const deleteEmployee = async(route = '', param, success, errorHandler) =>{
    return await Axios.delete(API + route +`/${param}`).then((response) =>success(response)).catch((error) => errorHandler(error));
}

/** 
 * Description: Hàm xóa hàng loạt dữ liệu dựa trên tham số đàu vào.
 * created : tvTam (22/02/2023)
 */
 export const deleteMultiEmployee = async(route = '', params, errorHandler) =>{
    let result = true;
    for (let param of params){
        await Axios.delete(API + route +`/${param}`).catch((error) => {errorHandler(error); result = false});
    }
    return result;
}

/**
 * Description: Hàm để lấy về mã số nhân viên mới.
 * created : tvTam (22/02/2023)
 */
export const getNewAssetsCode = async(route ='', success, errorHandler) =>{
    return await Axios.get(API + route).then(
        (response) => success(response)
    ).catch(error => {
        errorHandler(error);
    })
}