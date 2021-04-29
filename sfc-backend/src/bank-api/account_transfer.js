const axios = require("axios").default;
const baseUrl = "https://openapi.wooribank.com:444";

const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'appKey': 'l7xxdAzYrDHUrJ6cYoTwJqOrwxG678qWvNCL'
}
// 인자로 출금계좌,입금계좌,금액 받음

const UserTransfer = (myAccount,amount,yourAccount,text) => { 
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
                WDR_ACNO: myAccount, //출금 계좌번호
                TRN_AM: amount,
                RCV_BKCD: '020',
                RCV_ACNO: yourAccount,
                PTN_PBOK_PRNG_TXT: text,//저장될 말
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
UserTransfer('1002134567899','10000','1002987654321','스터디룸 비용');