import axios from 'axios';

const environmentMod = {
    'DEV': {
        url: '',
    },
    'UAT': {
        type: '/uat',
        businessChannel: 'XDFXD',
        channelId: "01",
        inputSource: "I001",
        versionId: "1.0.0",
        org: "000004332361",
        updateMode: "auto"
    },
    'PROD': {
        url: '',
    }
};

const environment = environmentMod['UAT'];

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
            businessChannel: environment.businessChannel,
            channelId: environment.channelId,
            inputSource: environment.inputSource,
            org: environment.org,
            versionId: environment.versionId
        },
        request: paramsStr
    }
};

const requestMod = (headRequest, callBack) => {
    axios({
        method: 'post',
        baseURL: environment.type,
        headers: {
            'Content-Type': 'application/json'
        },
        data: headRequest
    })
        .then((response) => {
            callBack(response);
        })
        .catch((error) => {
            console.log(error);
        });
};

export {interfaceMod, headRequestMod, requestMod}