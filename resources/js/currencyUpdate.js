function currencyUpdateTraget(){
    var userLang = navigator.language || navigator.userLanguage; 

    if(userLang == "ko-KR")
        return;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD", false );
    xmlHttp.send( null );
    let currency = JSON.parse(xmlHttp.response);
    let KRtoENratio = 2/(currency[0]["cashBuyingPrice"] + currency[0]["cashSellingPrice"]);
    
    let targets = Array.from(document.getElementsByClassName("currencyUpdateTraget"));
    for(let i = 0; i < targets.length; ++i){
        let wholeText = targets[i].innerText;
        let textLst = wholeText.split(',');
        let currentMoney = textLst[1];
        let currentLst = currentMoney.split(' ');
        let price = currentLst[1];
        price = price.substr(0,price.length - 1) * 1000;
        currentLst[1] = Math.ceil(price * KRtoENratio);
        currentLst[2] = 'USD';
        currentMoney = currentLst.join(' ');
        textLst[1] = currentMoney;
        targets[i].innerText = textLst.join(',');
    }
}

currencyUpdateTraget();