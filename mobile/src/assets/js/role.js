const Role = {
    // 授信_会后秘书
    'countersignSecretaryTask': () => {
        return {
            modifyPermissions: true,
            approveColumns: [
                {"key": 'FL', "text": "遵循贷审会决议"},
                {"key": 'RE', "text": "退回补件"}
            ],
            columnsUnit: [
                {"key": 'D', "text": "日", "type": 'unit'},
                {"key": 'M', "text": "月", "type": 'unit'},
                {"key": 'S', "text": "季", "type": 'unit'},
                {"key": 'Y', "text": "年", "type": 'unit'},
            ],
            columnsMethod: [
                {"key": '1', "text": "等额本金", "type": 'mode'},
                {"key": '2', "text": "等额本息", "type": 'mode'},
                {"key": '3', "text": "定期还息，到期还本", "type": 'mode'},
                {"key": '4', "text": "到期还本付息", "type": 'mode'},
            ]
        }
    },

    // 授信_授信部负责人
    'grantingCreditTask': () => {
        return {
            modifyPermissions: true,
            approveColumns: [
                {"key": 'OK', "text": "同意"},
                {"key": 'OC', "text": "有条件同意"},
                {"key": 'RE', "text": "退回补件"},
                {"key": 'RJ', "text": "否决"}
            ],
            columnsUnit: [
                {"key": 'D', "text": "日", "type": 'unit'},
                {"key": 'M', "text": "月", "type": 'unit'},
                {"key": 'S', "text": "季", "type": 'unit'},
                {"key": 'Y', "text": "年", "type": 'unit'},
            ],
            columnsMethod: [
                {"key": '1', "text": "等额本金", "type": 'mode'},
                {"key": '2', "text": "等额本息", "type": 'mode'},
                {"key": '3', "text": "定期还息，到期还本", "type": 'mode'},
                {"key": '4', "text": "到期还本付息", "type": 'mode'},
            ]
        }
    },

    // 授信_审查人
    'creditCheckerTask': () => {
        return {
            modifyPermissions: true,
            approveColumns: [
                {"key": 'OK', "text": "同意"},
                {"key": 'OC', "text": "有条件同意"},
                {"key": 'RE', "text": "退回补件"},
                {"key": 'RJ', "text": "否决"}
            ],
            columnsUnit: [
                {"key": 'D', "text": "日", "type": 'unit'},
                {"key": 'M', "text": "月", "type": 'unit'},
                {"key": 'S', "text": "季", "type": 'unit'},
                {"key": 'Y', "text": "年", "type": 'unit'},
            ],
            columnsMethod: [
                {"key": '1', "text": "等额本金", "type": 'mode'},
                {"key": '2', "text": "等额本息", "type": 'mode'},
                {"key": '3', "text": "定期还息，到期还本", "type": 'mode'},
                {"key": '4', "text": "到期还本付息", "type": 'mode'},
            ]
        }
    },

    // 授信_信贷部负责人
    'creditManagerTask': () => {
        return {
            modifyPermissions: false,
            approveColumns: [
                {"key": 'OK', "text": "同意"},
                {"key": 'OC', "text": "有条件同意"},
                {"key": 'RE', "text": "退回补件"},
                {"key": 'RJ', "text": "否决"}
            ]
        }
    },

    // 授信_信贷副行长
    'creditVicePresidentTask': () => {
        return {
            modifyPermissions: false,
            approveColumns: [
                {"key": 'OK', "text": "同意"},
                {"key": 'OC', "text": "有条件同意"},
                {"key": 'RE', "text": "退回补件"},
                {"key": 'RJ', "text": "否决"}
            ]
        }
    },

    // 授信_授信审批委员会
    'countersignTask': () => {
        return {
            modifyPermissions: false,
            approveColumns: [
                {"key": 'OK', "text": "同意"},
                {"key": 'OC', "text": "有条件同意"},
                {"key": 'RE', "text": "退回补件"},
                {"key": 'RJ', "text": "否决"}
            ]
        }
    },

    // 授信_授信审批委员会主任
    'countersignPresidentTask': () => {
        return {
            modifyPermissions: false,
            approveColumns: [
                {"key": 'OK', "text": "同意"},
                {"key": 'OC', "text": "有条件同意"},
                {"key": 'RE', "text": "退回补件"},
                {"key": 'RJ', "text": "否决"}
            ]
        }
    },

    // 授信_有权审批人(上会审批)
    'competentApproverTask': () => {
        return {
            modifyPermissions: false,
            approveColumns: [
                {"key": 'OK', "text": "同意"},
                {"key": 'OC', "text": "有条件同意"},
                {"key": 'RJ', "text": "否决"}
            ]
        }
    },

    // 授信_支行行长
    'bankBranchManagerTask': () => {
        return {
            modifyPermissions: false,
            approveColumns: [
                {"key": 'OK', "text": "同意"},
                {"key": 'OC', "text": "有条件同意"},
                {"key": 'RE', "text": "退回补件"},
                {"key": 'RJ', "text": "否决"}
            ]
        }
    },

    // 授信_有权审批人(单人审批)
    'singleCompetentApproverTask': () => {
        return {
            modifyPermissions: false,
            approveColumns: [
                {"key": 'OK', "text": "同意"},
                {"key": 'OC', "text": "有条件同意"},
                {"key": 'RJ', "text": "否决"}
            ]
        }
    },

    // 合同_审计合规岗
    'auditComplianceTask': () => {
        return {
            modifyPermissions: false,
            approveColumns: [
                {"key": 'OK', "text": "审查通过"},
                {"key": 'RE', "text": "退回补件"}
            ]
        }
    },

    // 合同_合同用章签批岗
    'contractSignATask': () => {
        return {
            modifyPermissions: false,
            approveColumns: [
                {"key": 'OK', "text": "完成"},
                {"key": 'RE', "text": "退回"}
            ]
        }
    },

    //合同_合同用章签批岗
    'contractSignBTask': () => {
        return {
            modifyPermissions: false,
            approveColumns: [
                {"key": 'OK', "text": "完成"},
                {"key": 'RE', "text": "退回"}
            ]
        }
    },

    // 合同及放款_放款中心
    'loanCheckerTask': () => {
        return {
            modifyPermissions: false,
            approveColumns: [
                {"key": 'OK', "text": "同意放款"},
                {"key": 'RE', "text": "退回补件"}
            ]
        }
    },
};

export { Role }