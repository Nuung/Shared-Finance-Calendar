const axios = require("axios").default;
const baseUrl = "https://openapi.wooribank.com:444";


// configue
const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'appKey': 'l7xxdAzYrDHUrJ6cYoTwJqOrwxG678qWvNCL'
}

/** 휴대폰인증발송
 * @desc    - 휴대폰 + 계좌 인증을 이용하여 로그인 정보를 제공한다
 * @method  - POST
 */
const PhoneAuth = () => {
    const options = {
        method: 'POST',
        url: `${baseUrl}/oai/wb/v1/login/getCellCerti`,
        headers: headers,
        data: {
            dataHeader: {
                UTZPE_CNCT_IPAD: '',
                UTZPE_CNCT_MCHR_UNQ_ID: '',
                UTZPE_CNCT_TEL_NO_TXT: '',
                UTZPE_CNCT_MCHR_IDF_SRNO: '',
                UTZ_MCHR_OS_DSCD: '',
                UTZ_MCHR_OS_VER_NM: '',
                UTZ_MCHR_MDL_NM: '',
                UTZ_MCHR_APP_VER_NM: ''
            },
            dataBody: {
                COMC_DIS: '1',
                HP_NO: '01012345678',
                HP_CRTF_AGR_YN: 'Y',
                FNM: '홍길동',
                RRNO_BFNB: '930216',
                ENCY_RRNO_LSNM: '1234567'
            }
        }
    };

    // request 
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
};

/** 휴대폰인증번호확인
 * @desc    - 휴대폰 인증을 위하여 보낸 인증번호를 확인한다
 * @method  - POST
 */
const PhoneAuthCheck = (CRTF_UNQ_NO) => {
    const options = {
        method: 'POST',
        url: `${baseUrl}/oai/wb/v1/login/executeCellCerti`,
        headers: headers,
        data: {
            dataHeader: {
                UTZPE_CNCT_IPAD: '',
                UTZPE_CNCT_MCHR_UNQ_ID: '',
                UTZPE_CNCT_TEL_NO_TXT: '',
                UTZPE_CNCT_MCHR_IDF_SRNO: '',
                UTZ_MCHR_OS_DSCD: '',
                UTZ_MCHR_OS_VER_NM: '',
                UTZ_MCHR_MDL_NM: '',
                UTZ_MCHR_APP_VER_NM: ''
            },
            dataBody: {
                RRNO_BFNB: "930216",
                ENCY_RRNO_LSNM: "1234567",
                ENCY_SMS_CRTF_NO: "1111111",
                CRTF_UNQ_NO: "MG12345678901234567890"
            }
        }
    };

    // request 
    axios.request(options).then(function (response) {
        const { dataBody } = response.data;
        console.log(dataBody);
    }).catch(function (error) {
        console.error(error);
    });
}


/** 계좌기본조회
 * @desc    - 우리은행의 계좌 별 정보를 조회한다. 전계좌조회의 계좌상태코드가 휴면코드나, 해지코드로 조회된 계좌는 계좌기본조회가 불가하다.
 * @method  - POST
 */
const getTargetAcount = (TOKEN) => {
    const options = {
        method: 'POST',
        url: `${baseUrl}/oai/wb/v1/finance/getAccBasicInfo`,
        headers: headers, // header에 원래 인증 TOKEN필요함 
        data: {
            dataHeader: {
                UTZPE_CNCT_IPAD: '',
                UTZPE_CNCT_MCHR_UNQ_ID: '',
                UTZPE_CNCT_TEL_NO_TXT: '',
                UTZPE_CNCT_MCHR_IDF_SRNO: '',
                UTZ_MCHR_OS_DSCD: '',
                UTZ_MCHR_OS_VER_NM: '',
                UTZ_MCHR_MDL_NM: '',
                UTZ_MCHR_APP_VER_NM: ''
            },
            dataBody: {
                INQ_ACNO: '1002123456789',
                INQ_BAS_DT: '20210220',
                ACCT_KND: 'P',
                INQ_CUCD: 'KRW'
            }
        }
    };

    // request 
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

/** 당행 계좌 이체 
 * @desc    - 
 * @method  - POST
 */
const UserTransfer = (myAccount, amount, yourAccount, text) => {

    console.log(myAccount);
    const options = {
        method: 'POST',
        url: `${baseUrl}/oai/wb/v1/trans/executeWooriAcctToWooriAcct`,
        headers: headers,
        data: {
            dataHeader: {
                UTZPE_CNCT_IPAD: '',
                UTZPE_CNCT_MCHR_UNQ_ID: '',
                UTZPE_CNCT_TEL_NO_TXT: '',
                UTZPE_CNCT_MCHR_IDF_SRNO: '',
                UTZ_MCHR_OS_DSCD: '',
                UTZ_MCHR_OS_VER_NM: '',
                UTZ_MCHR_MDL_NM: '',
                UTZ_MCHR_APP_VER_NM: ''
            },
            dataBody: {
                WDR_ACNO: myAccount, // 출금 계좌번호
                TRN_AM: amount, // 거래 금액 
                RCV_BKCD: '020',
                RCV_ACNO: yourAccount, // 입금 계좌 
                PTN_PBOK_PRNG_TXT: text, // 저장될 말
            }
        }
    };

    // request 
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
};

UserTransfer('1002134567899', '500000', '1002987654321', '스터디룸 비용');

// RUN MAIN
// getTargetAcount();
// PhoneAuthCheck();