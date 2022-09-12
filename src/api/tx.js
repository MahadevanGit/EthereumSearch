var _recentBlockNumber;
const serachText = window.location.search;
let transNumber = serachText.replace('?searchInput=', '').replace('?search2=','');
//for test
//transNumber = "0x2fa16d8e03868f266cea6b3470092694563ac46af9a9e9d4dc8fa2bc81d505cd";

document.addEventListener('DOMContentLoaded', () => {
    console.log('tx.js started!!!');
    getRecentBlockNumber();
    loadTransactionInfo(transNumber);
});

function getRecentBlockNumber(){
    infura_web3.eth.getBlockNumber().then((result) => {
        _recentBlockNumber = result;
    });
}

function loadTransactionInfo(transNumber){
    let etherDividerVal = 1000000000000000000;
    let gweiDividerVal = 1000000000;
    //loader
    var loadDiv = document.createElement('div');
    loadDiv.id = 'loader'
    loadDiv.className = 'loader';
    document.body.appendChild(loadDiv);
    var l = document.getElementById('latestTransactionsDiv');
    l.appendChild(loadDiv);

    if (!transNumber) {
        //append row
        var l = document.getElementById('latestTransactionsDiv');
        l.innerHTML = "<span>No content to display.</span>"
    } else {
        GetTransactionByHash(transNumber).then((result)=>{
            //loader remove from dom
            if (result != null) {
                var l = document.getElementById('latestTransactionsDiv');
                l.removeChild(loadDiv);
            }
            //row 1
            var rowDiv1 = document.createElement('div');
            rowDiv1.id = 'txHashRowDiv1';
            rowDiv1.className = 'row';
            document.body.appendChild(rowDiv1);
            //Transaction label column
            var colLabelDiv = document.createElement('div');
            colLabelDiv.id = 'txHashLabelDiv';
            colLabelDiv.className = 'col col-mar';
            colLabelDiv.innerText = 'Transaction hash: ';
            var s = document.getElementById('txHashRowDiv1');
            s.appendChild(colLabelDiv);
            //Transaction value column
            var colValueDiv = document.createElement('div');
            colValueDiv.id = 'blockheightValDiv';
            colValueDiv.className = 'col-65 col-mar';
            colValueDiv.innerText = result.hash;
            var s = document.getElementById('txHashRowDiv1');
            s.appendChild(colValueDiv);

            //row 2
            var rowDiv2 = document.createElement('div');
            rowDiv2.id = 'blockNumberRowDiv2';
            rowDiv2.className = 'row';
            document.body.appendChild(rowDiv2);
            //blockNumber label column
            var collabelDiv = document.createElement('div');
            collabelDiv.id = 'blcNumLabelDiv';
            collabelDiv.className = 'col col-mar';
            collabelDiv.innerText = 'Block: ';
            var s = document.getElementById('blockNumberRowDiv2');
            s.appendChild(collabelDiv);
            //blockNumber value column
            var colValueDiv = document.createElement('div');
            colValueDiv.id = 'blcNumValDiv';
            colValueDiv.className = 'col-65 col-mar';
            colValueDiv.innerText = result.blockNumber;
            var s = document.getElementById('blockNumberRowDiv2');
            s.appendChild(colValueDiv);

            //row 3
            var rowDiv3 = document.createElement('div');
            rowDiv3.id = 'fromRowDiv3';
            rowDiv3.className = 'row';
            document.body.appendChild(rowDiv3);
            //timestamp label column
            var colLabelDiv = document.createElement('div');
            colLabelDiv.id = 'fromLabelDiv';
            colLabelDiv.className = 'col col-mar';
            colLabelDiv.innerText = 'From: ';
            var s = document.getElementById('fromRowDiv3');
            s.appendChild(colLabelDiv);
            //timestamp value column
            var colValueDiv = document.createElement('div');
            colValueDiv.id = 'fromValDiv';
            colValueDiv.className = 'col-65 col-mar';
            colValueDiv.innerText = result.from ;
            var s = document.getElementById('fromRowDiv3');
            s.appendChild(colValueDiv);

            // //row 4
            var rowDiv4 = document.createElement('div');
            rowDiv4.id = 'toRowDiv4';
            rowDiv4.className = 'row';
            document.body.appendChild(rowDiv4);
            //uncles reward label column
            var colLabelDiv = document.createElement('div');
            colLabelDiv.id = 'toLabelDiv';
            colLabelDiv.className = 'col col-mar';
            colLabelDiv.innerText = 'To: ';
            var s = document.getElementById('toRowDiv4');
            s.appendChild(colLabelDiv);
            //timestamp value column
            var colValueDiv = document.createElement('div');
            colValueDiv.id = 'toValDiv';
            colValueDiv.className = 'col-65 col-mar';
            colValueDiv.innerText = result.to ;
            var s = document.getElementById('toRowDiv4');
            s.appendChild(colValueDiv);

            // //row 5
            var rowDiv5 = document.createElement('div');
            rowDiv5.id = 'valueRowDiv5';
            rowDiv5.className = 'row';
            document.body.appendChild(rowDiv5);
            //value label column
            var colLabelDiv = document.createElement('div');
            colLabelDiv.id = 'valueLabelDiv';
            colLabelDiv.className = 'col col-mar';
            colLabelDiv.innerText = 'Value: ';
            var s = document.getElementById('valueRowDiv5');
            s.appendChild(colLabelDiv);
            //value value column
            var colvalueDiv = document.createElement('div');
            colvalueDiv.id = 'valueValDiv';
            colvalueDiv.className = 'col-65 col-mar';
            colvalueDiv.innerHTML = "<span class='span-badge'>" + result.value/etherDividerVal + " Ether </span>";
            var s = document.getElementById('valueRowDiv5');
            s.appendChild(colvalueDiv);

            // //row 6
            var rowDiv6 = document.createElement('div');
            rowDiv6.id = 'gasPriceRowDiv6';
            rowDiv6.className = 'row';
            document.body.appendChild(rowDiv6);
            //gasPrice label column
            var colLabelDiv = document.createElement('div');
            colLabelDiv.id = 'gasPriceLabelDiv';
            colLabelDiv.className = 'col col-mar';
            colLabelDiv.innerText = 'Gas price: ';
            var s = document.getElementById('gasPriceRowDiv6');
            s.appendChild(colLabelDiv);
            //gasPrice value column
            var colalueDiv = document.createElement('div');
            colalueDiv.id = 'gasPriceValDiv';
            colalueDiv.className = 'col-65 col-mar';
            let eth = result.gasPrice/etherDividerVal + ' Ether (';
            let gwei = result.gasPrice/gweiDividerVal + ' Gwei) '
            colalueDiv.innerText = eth + gwei;
            var s = document.getElementById('gasPriceRowDiv6');
            s.appendChild(colalueDiv);

            // //row 7
            var rowDiv7 = document.createElement('div');
            rowDiv7.id = 'gasRowDiv7';
            rowDiv7.className = 'row';
            document.body.appendChild(rowDiv7);
            //gasLimit label column
            var colLabelDiv = document.createElement('div');
            colLabelDiv.id = 'gasLimitLabelDiv';
            colLabelDiv.className = 'col col-mar';
            colLabelDiv.innerText = 'Gas Limit: ';
            var s = document.getElementById('gasRowDiv7');
            s.appendChild(colLabelDiv);
            //gasLimit value column
            var colalueDiv = document.createElement('div');
            colalueDiv.id = 'gasLimitValDiv';
            colalueDiv.className = 'col-65 col-mar';
            colalueDiv.innerText = result.gas.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var s = document.getElementById('gasRowDiv7');
            s.appendChild(colalueDiv);

            //append row and hr
            var l = document.getElementById('latestTransactionsDiv');

            l.appendChild(rowDiv1);
            var rowhr = document.createElement('hr');

            l.appendChild(rowDiv2);
            var rowhr = document.createElement('hr');
            rowhr.className = 'hr-space';
            l.appendChild(rowhr);

            l.appendChild(rowDiv3);

            l.appendChild(rowDiv4);
            var rowhr = document.createElement('hr');
            rowhr.className = 'hr-space';
            l.appendChild(rowhr);

            l.appendChild(rowDiv5);
            var rowhr = document.createElement('hr');
            rowhr.className = 'hr-space';
            l.appendChild(rowhr);

            l.appendChild(rowDiv6);
            var rowhr = document.createElement('hr');
            rowhr.className = 'hr-space';
            l.appendChild(rowhr);

            l.appendChild(rowDiv7);
            var rowhr = document.createElement('hr');
            rowhr.className = 'hr-space';
            l.appendChild(rowhr);
        }).catch((err) => {
            //append row
            var l = document.getElementById('latestTransactionsDiv');
            l.innerHTML = "<span class='error-text'>Not a valid transaction hash number.</span>"
        });
    }
}

function searchFormSubmit(event) {
    var searchInputVal = document.getElementById("searchBTFormInput").value;
    let intValue = parseInt(searchInputVal)
    if(isNaN(intValue)) {
        event.preventDefault();
        return
    };
    if (intValue < (_recentBlockNumber * 2))
        window.location = Config.base_url + "src/screen/block.html?searchInput=" + searchInputVal;
    else
        window.location = Config.base_url + "src/screen/tx.html?searchInput=" + searchInputVal;
    event.preventDefault();

}

const form = document.getElementById('searchBTForm');

form.addEventListener('submit', searchFormSubmit);