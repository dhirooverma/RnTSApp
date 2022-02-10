import { Platform } from 'react-native';
interface APIInterface {
    apiName: string,
    method: string,
    body?: object
}
class API {

    static localhost = Platform.OS == 'android' ? 'http://10.0.2.2:8000' : 'http://127.0.0.1:8000';

    static runAPI(data: APIInterface) {
        let reqObject = {
            method: data.method,
        }
        if (data.body) {
            reqObject['headers'] = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            reqObject['body'] = JSON.stringify(data.body);
        }
        return fetch(`${API.localhost}/${data.apiName}/`, reqObject);
    }

    static async login(email: String, password) {
        let where = {
            "email": email,
            "password": password
        }
        console.log(where);
        let ret: object | any = {};
        try {
            let res = await API.runAPI({ apiName: 'login', method: "post", body: where });
            let response = await res.json();
            if (response) {
                if (response['response'] == 1) {
                    ret = { status: true, data: response };
                } else if (response['response'] == 0) {
                    ret = { status: false, "msg": response['error'] };
                }
                console.log(response);
            }
        } catch (err) {
            ret = { status: false, msg: "some error occur" };
            console.log(err);
        }
        return ret;
    }

    static async getUsers() {
        let ret: any = {};
        try {
            let res = await API.runAPI({ apiName: 'user_list', method: "get" });
            let response = await res.json();
            if (response) {
                ret = { status: true, data: response };
            }
        } catch (err) {
            ret = { status: false, msg: "some error occur" };
            console.log(err);
        }
        return ret;
    }

    static async deleteUsers(id) {
        let ret: any = {};
        try {
            let res = await API.runAPI({ apiName: 'user_delete', method: "post", body: { 'id': id } });
            let response = await res.json();
            if (response) {
                ret = { status: true, data: response };
            }
        } catch (err) {
            ret = { status: false, msg: "some error occur" };
            console.log(err);
        }
        return ret;
    }

    static async signup(data) {
        let where = {
            "first_name": data.first_name,
            "middile_name": data.middle_name,
            "last_name": data.last_name,
            "email": data.email,
            "password": data.password,
            "role_type": 'user'
        }
        console.log("=>>>>>>>>>>>>>", where);
        let ret: object | any = {};
        try {
            let res = await API.runAPI({ apiName: 'user_create', method: "post", body: where });
            let response = await res.json();
            console.log(response);
            if (response) {
                if (response["response"] == 1) {
                    ret = { status: true, data: response };
                } else {
                    if ((typeof response) == 'string') {
                        ret = { status: false, "msg": response };
                    } else if (typeof response == 'object') {
                        ret = { status: false, "msg": JSON.stringify(response) };
                    }
                }
                console.log(response);
            }
        } catch (err) {
            ret = { status: false, msg: "some error occur" };
            console.log(err);
        }
        return ret;
    }

    static async userUpdate(data) {
        let where = {
            "id": data.id,
            "first_name": data.first_name,
            "middile_name": data.middle_name,
            "last_name": data.last_name,
            "role_type": data.role
        }
        console.log("where =====>>>>>", where);
        let ret: object | any = {};
        try {
            let res = await API.runAPI({ apiName: 'user_update', method: "put", body: where });
            let response = await res.json();
            console.log("response =====>>>>>", response);
            if (response) {
                if (response["response"] == 1) {
                    ret = { status: true, data: response };
                } else {
                    if ((typeof response) == 'string') {
                        ret = { status: false, "msg": response };
                    } else if (typeof response == 'object') {
                        ret = { status: false, "msg": JSON.stringify(response) };
                    }
                }
            }
        } catch (err) {
            ret = { status: false, msg: "some error occur" };
            console.log(err);
        }
        return ret;
    }
}

export default API;