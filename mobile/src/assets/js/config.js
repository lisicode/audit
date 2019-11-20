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
    'getServiceSn': () => {
        return '2'
    },
    'getTimes': () => {
        return '3'
    },
    'getToken': () => {
        return '4'
    },
    'getImei': () => {
        return '5'
    },
    'getImsi': () => {
        return '6'
    },
};

const headRequestMod = (serviceId, paramsStr) => {
    return {
        head: {
            serviceId: serviceId,
            opId: publicMod['getUserNo']()
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