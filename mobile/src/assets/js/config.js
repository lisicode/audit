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
    userLogin: '00B005',
};

// 公共函数
const PublicMethods = {
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
            mac: PublicMethods['getImei'](),
            phoneIMEI: PublicMethods['getImsi'](),
            businessChannel: Environment.businessChannel,
            channelId: Environment.channelId,
            inputSource: Environment.inputSource,
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
    return response.data
}, error => {
    console.log(error)
});

export { InterfaceCode, AssembleRequestData, Request }