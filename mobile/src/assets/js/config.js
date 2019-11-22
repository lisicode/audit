import axios from 'axios';

const environmentMod = {
    'DEV': {
        url: '',
    },
    'UAT': {
        url: 'http://192.168.200.201/agw-web/fintech/common/gatewayService',
    },
    'PROD': {
        url: '',
    }
};

const interfaceMod = {
    userLogin: '00B005',
};

const publicMod = {
    'getUserNo': () => {
        return '1'
    },
    'getImei': () => {
        return '2'
    },
    'getImsi': () => {
        return '3'
    },
};

const headRequestMod = (serviceId, paramsStr) => {
    return {
        head: {
            serviceId: serviceId,
            opId: publicMod['getUserNo'](),
            mac: publicMod['getImei'](),
            phoneIMEI: publicMod['getImsi'](),
        },
        request: paramsStr
    };
};

const environment = environmentMod['UAT'];

const requestMod = (data, callBack) => {
    axios.post(environment.url, data)
        .then((response) => {
            callBack(response);
        })
        .catch((error) => {
            console.log(error);
        });
};

export {interfaceMod, headRequestMod, requestMod}