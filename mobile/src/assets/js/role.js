const Role = {
    // 会后秘书
    'countersignSecretaryTask': () => {
        return {
            modifyPermissions: true,
            ApproveColumns: [
                {"keyId": 'OK', "text": "同意", "type": 'result'},
                {"keyId": 'OC', "text": "有条件同意", "type": 'result'},
                {"keyId": 'FL', "text": "遵循贷审会决议", "type": 'result'},
                {"keyId": 'RE', "text": "补件", "type": 'result'},
                {"keyId": 'RJ', "text": "拒绝", "type": 'result'}
            ]
        }
    },
    // 授信部负责人
    'grantingCreditTask': () => {

    },
    // 审查人
    'creditCheckerTask': () => {

    }
};

export { Role }