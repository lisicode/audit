import axios from 'axios';
import router from '@/router';

// 环境
const EnvironmentConfig = {
    'UAT': {
        type: 'uat',
        url: 'http://192.168.200.208:8080/approveApp/appGatewayService',
        businessChannel: 'XDFXD',
        channelId: "01",
        inputSource: "I001",
        versionId: "1.0.0",
        org: "000004332361",
        updateMode: "auto"
    },
    'PROD': {
        type: 'prod',
        url: 'http://192.168.200.208:8080/approveApp/appGatewayService',
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
    QueryContractDetails: '02B314',
    ProcessSubmit: '02B311',
    ChangeProcessSubmit: '02B312',
    QueryUserDetails: '01B310',
    QueryPledge: '02B304',
    QueryGuarantee: '02B305',
    QueryGuarantor: '02B313',
    QueryProgress: '02B306',
    QueryProgressDetails: '02B307',
    QueryMaterialsClassification: '02B308',
    QueryMaterialsList: '02B309',
    QueryLoanDetails: '02B315',
    messageList: '02B318',
    messageDetails: '02B319',
    messageDel: '02B320',
    allMessageDel: '02B321',
    changePassword: '00B323',
    QueryAlreadyApplyDetails: '02B324',
    QueryAlreadyContractDetails: '02B325',
    QueryAlreadyLoanDetails: '02B326',
    logOut: '00B322',
    QueryCurrentTaskNum: '02B316'
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
        if (Environment.type == 'prod') {
            return plus.device.imei
        } else {
            return '88888888'
        }
    },
    'getImsi': () => {
        if (Environment.type == 'prod') {
            return plus.device.imsi
        } else {
            return '88888888'
        }
    },
    'setLocalStorage': (type, data) => {
        return localStorage.setItem(type, JSON.stringify(data));
    },
    'getLocalStorage': (type) => {
        return JSON.parse(localStorage.getItem(type))
    },
    'TimeFormat': (e) => {
        if (e.length > 8) {
            return e.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,'$1-$2-$3 $4:$5:$6')
        } else {
            return e.replace(/(\d{4})(\d{2})(\d{2})/,'$1-$2-$3')
        }
    },
    'formatDate': (e) => {
        if (e) {
            let now = new Date(e);
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let date = now.getDate();
            let hour = now.getHours();
            let minute = now.getMinutes();
            let second = now.getSeconds();
            return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        } else {
            return '空'
        }
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
    } else {
        router.push({path: '/login'})
    }
    return response.data
}, error => {
    console.log(error)
});

export { InterfaceCode, AssembleRequestData, Request, PublicMethods }