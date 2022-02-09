import { Platform } from 'react-native';
class API {
    
    static localhost = Platform.OS == 'android' ? 'http://10.0.2.2:8000' : 'http://127.0.0.1:8000';

    static runAPI(apiName: string, method: string, body: object | undefined = undefined) {
        let reqObject = {
            method: method,
        }
        if (body) {
            reqObject['headers'] = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            reqObject['body'] = JSON.stringify(body);
        }
        return fetch(`${API.localhost}/${apiName}/`, reqObject);
    }

    static async login(email: String , password) {
        let where ={
            "email": email,
            "password": password
        }
        console.log(where);
        let ret: object | any = {};
        try {
            let res = await API.runAPI('login', "post", where);
            let response = await res.json();
            if (response) {
                if (response['response'] == 1) {
                    ret = {status: true, data: response};
                } else if(response['response'] == 0) {
                    ret = {status: false, "msg": response['error']};
                }
                console.log(response);
            }
        } catch (err) {
            ret = {status: false, msg: "some error occur"};
            console.log(err);
        }
        return ret;
    }

    static async getUsers() {
        let ret: any = {};
        try {
            let res = await API.runAPI('user_list', "get");
            let response = await res.json();
            if (response) {
                ret = {status: true, data: response};
            }
        } catch (err) {
            ret = {status: false, msg: "some error occur"};
            console.log(err);
        }
        return ret;
    }

    static async deleteUsers(id) {
        let ret: any = {};
        try {
            let res = await API.runAPI('user_delete', "post", {'id': id});
            let response = await res.json();
            if (response) {
                ret = {status: true, data: response};
            }
        } catch (err) {
            ret = {status: false, msg: "some error occur"};
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
            let res = await API.runAPI('user_create', "post", where);
            let response = await res.json();
            console.log(response);
            if (response) {
                if (response["response"] == 1) {
                    ret = {status: true, data: response};
                } else {
                    if ((typeof response) == 'string') {
                        ret = {status: false, "msg": response};
                    } else if (typeof response == 'object') {
                        ret = {status: false, "msg": JSON.stringify(response)};
                    }
                }
                console.log(response);
            }
        } catch (err) {
            ret = {status: false, msg: "some error occur"};
            console.log(err);
        }
        return ret;
    }
}

export default API;