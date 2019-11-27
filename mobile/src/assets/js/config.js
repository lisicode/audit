import axios from 'axios';

const environmentMod = {
    'DEV': {
        url: '',
    },
    'UAT': {
        type: 'UAT',
        url: 'http://192.168.200.201/agw-web/fintech/common/gatewayService',
    },
    'PROD': {
        url: '',
    }
};

const UAT_url = 'http://192.168.200.201/agw-web/fintech/common/gatewayService';
const UAT_businessChannel = "XDFXD";
const UAT_channelId = "01";
const UAT_inputSource = "I001";
const UAT_versionId = "1.0.0";
const UAT_org = "000004332361";
const UAT_updateMode = "auto";

const environment = environmentMod['UAT'];
const app_businessChannel = eval(environment.type + "_businessChannel");



const interfaceMod = {
    userLogin: '00B005',
};

const publicMod = {
    'getUserNo': () => {
        return ''
    },
    'getTimes': () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day = date.getDate();
        day = day < 10 ? ('0' + day) : day;
        let hours = date.getHours();
        hours = hours < 10 ? ('0' + hours) : hours;
        let minutes = date.getMinutes();
        minutes = minutes < 10 ? ('0' + minutes) : minutes;
        let second = date.getSeconds();
        second = second < 10 ? ('0' + second) : second;
        return year + '' + month + '' + day + '' + hours + '' + minutes + '' + second;
        // let milliseconds = date.getMilliseconds().toString();
        // milliseconds = milliseconds.length == 1 ? ("00" + milliseconds) : milliseconds;
        // milliseconds = milliseconds.length == 2 ? ("0" + milliseconds) : milliseconds;
        // return year + '' + month + '' + day + '' + hours + '' + minutes + '' + second + '' + milliseconds;
    },
    'getToken': () => {
        return ''
    },
    'getImei': () => {
        return '88888888'
    },
    'getImsi': () => {
        return '88888888'
    },
};

const headRequestMod = (serviceId, paramsStr) => {
    return {
        head: {
            serviceId: serviceId,
            opId: publicMod['getUserNo'](),
            serviceSn: publicMod['getImei']() + publicMod['getTimes'](),
            requestTime: publicMod['getTimes'](),
            tokenNo: publicMod['getToken'](),
            mac: publicMod['getImei'](),
            phoneIMEI: publicMod['getImsi'](),
        },
        request: paramsStr
    };
};

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