import axios from 'axios';

// 环境
const EnvironmentConfig = {
    'DEV': {
        url: '',
        businessChannel: 'XDFXD',
        channelId: "01",
        inputSource: "I001",
        versionId: "1.0.0",
        org: "000004332361",
        updateMode: "auto"
    },
    'UAT': {
        url: '/uat',
        businessChannel: 'XDFXD',
        channelId: "01",
        inputSource: "I001",
        versionId: "1.0.0",
        org: "000004332361",
        updateMode: "auto"
    },
    'PROD': {
        url: '',
        businessChannel: 'XDFXD',
        channelId: "01",
        inputSource: "I001",
        versionId: "1.0.0",
        org: "000004332361",
        updateMode: "auto"
    }
};

// 接口编号
const InterfaceCode = {
    UserLogin: '00B301',
    QueryFlow: '02B302',
    QueryAllUntreated: '02B317',
    QueryApplyDetails: '02B303',
    ProcessSubmit: '02B311',
    ChangeProcessSubmit: '02B312',
    QueryUserDetails: '01B310',
    QueryPledge: '02B304',
    QueryGuarantee: '02B305',

};

// 公共函数
const PublicMethods = {
    'getUserNo': () => {
        if (PublicMethods['getLocalStorage']('user')) {
            return PublicMethods['getLocalStorage']('user').userNo
        } else {
            return ''
        }
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
        if (PublicMethods['getLocalStorage']('tokenNo')) {
            return PublicMethods['getLocalStorage']('tokenNo')
        } else {
            return ''
        }
    },
    'getImei': () => {
        return '88888888'
    },
    'getImsi': () => {
        return '88888888'
    },
    'setLocalStorage': (type, data) => {
        return localStorage.setItem(type, JSON.stringify(data));
    },
    'getLocalStorage': (type) => {
        return JSON.parse(localStorage.getItem(type))
    }
};

// 环境定义
const Environment = EnvironmentConfig['UAT'];

// 组装请求数据
const AssembleRequestData = (serviceId, paramsStr) => {
    return {
        head: {
            serviceId: serviceId,
            opId: PublicMethods['getUserNo'](),
            serviceSn: PublicMethods['getImei']() + PublicMethods['getTimes'](),
            requestTime: PublicMethods['getTimes'](),
            tokenNo: PublicMethods['getToken'](),
            businessChannel: Environment.businessChannel,
            channelId: Environment.channelId,
            inputSource: Environment.inputSource,
            mac: PublicMethods['getImei'](),
            phoneIMEI: PublicMethods['getImsi'](),
            org: Environment.org,
            versionId: Environment.versionId
        },
        request: paramsStr
    }
};

// 创建请求实例
const Request = axios.create({
    timeout: 7000,
    baseURL: Environment.url,
    headers: {'Content-Type': 'application/json'}
});

// 添加请求拦截器
Request.interceptors.request.use(config => {
    return config
});

// 添加响应拦截器
Request.interceptors.response.use(response => {
    console.log('接口编号>> ' + response.data.head.serviceId);
    console.log(response.data);
    if (response.data.head.tokenNo) {
        PublicMethods['setLocalStorage']('tokenNo', response.data.head.tokenNo);
    }
    return response.data
}, error => {
    console.log(error)
});

export { InterfaceCode, AssembleRequestData, Request, PublicMethods }