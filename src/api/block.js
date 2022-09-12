var _recentBlockNumber;
const serachText = window.location.search;
let blockNumber = serachText.replace('?searchInput=', '').replace('?search2=', '');

document.addEventListener('DOMContentLoaded', () => {
    console.log('block.serivce.js started!!!');
    getRecentBlockNumber();
    loadBlockInfo();
});

function getRecentBlockNumber() {
    infura_web3.eth.getBlockNumber().then((result) => {
        _recentBlockNumber = result;
    });
}

function loadBlockInfo() {
    //loader
    var loadDiv = document.createElement('div');
    loadDiv.id = 'loader'
    loadDiv.className = 'loader';
    document.body.appendChild(loadDiv);
    var l = document.getElementById('latestBlockListDiv');
    l.appendChild(loadDiv);

    if (!blockNumber) {
        //append row
        var l = document.getElementById('latestBlockListDiv');
        l.innerHTML = "<span>No content to display.</span>"
    } else {
        getBlockByNumber(blockNumber).then((result) => {
            //loader remove from dom
            if (result != null) {
                var l = document.getElementById('latestBlockListDiv');
                l.removeChild(loadDiv);
            }
            //row 1
            var rowDiv1 = document.createElement('div');
            rowDiv1.id = 'blockContentRowDiv1';
            rowDiv1.className = 'row';
            document.body.appendChild(rowDiv1);
            //blockheight label column
            var colblockheightLabelDiv = document.createElement('div');
            colblockheightLabelDiv.id = 'blockheightLabelDiv';
            colblockheightLabelDiv.className = 'col col-mar';
            colblockheightLabelDiv.innerText = 'Block height: ';
            var s = document.getElementById('blockContentRowDiv1');
            s.appendChild(colblockheightLabelDiv);
            //blockheight value column
            var colblockheightValueDiv = document.createElement('div');
            colblockheightValueDiv.id = 'blockheightValDiv';
            colblockheightValueDiv.className = 'col-65 col-mar';
            colblockheightValueDiv.innerText = result.number;
            var s = document.getElementById('blockContentRowDiv1');
            s.appendChild(colblockheightValueDiv);

            //row 2
            var rowDiv2 = document.createElement('div');
            rowDiv2.id = 'blockContentRowDiv2';
            rowDiv2.className = 'row';
            document.body.appendChild(rowDiv2);
            //timestamp label column
            var coltimestampLabelDiv = document.createElement('div');
            coltimestampLabelDiv.id = 'timestampLabelDiv';
            coltimestampLabelDiv.className = 'col col-mar';
            coltimestampLabelDiv.innerText = 'Timestamp: ';
            var s = document.getElementById('blockContentRowDiv2');
            s.appendChild(coltimestampLabelDiv);
            //timestamp value column
            var coltimestampValueDiv = document.createElement('div');
            coltimestampValueDiv.id = 'timestampValDiv';
            coltimestampValueDiv.className = 'col-65 col-mar';
            coltimestampValueDiv.innerText = new Date(result.timestamp * 1000);
            var s = document.getElementById('blockContentRowDiv2');
            s.appendChild(coltimestampValueDiv);

            //row 3
            var rowDiv3 = document.createElement('div');
            rowDiv3.id = 'blockContentRowDiv3';
            rowDiv3.className = 'row';
            document.body.appendChild(rowDiv3);
            //minedBy label column
            var colminedByLabelDiv = document.createElement('div');
            colminedByLabelDiv.id = 'minedByLabelDiv';
            colminedByLabelDiv.className = 'col col-mar';
            colminedByLabelDiv.innerText = 'Mined by: ';
            var s = document.getElementById('blockContentRowDiv3');
            s.appendChild(colminedByLabelDiv);
            //timestamp value column
            var colminedByValueDiv = document.createElement('div');
            colminedByValueDiv.id = 'minedByValDiv';
            colminedByValueDiv.className = 'col-65 col-blue col-mar';
            colminedByValueDiv.innerText = result.miner;
            var s = document.getElementById('blockContentRowDiv3');
            s.appendChild(colminedByValueDiv);

            //row 4
            var rowDiv4 = document.createElement('div');
            rowDiv4.id = 'blockContentRowDiv4';
            rowDiv4.className = 'row';
            document.body.appendChild(rowDiv4);
            //uncles reward label column
            var colunclesLabelDiv = document.createElement('div');
            colunclesLabelDiv.id = 'unclesLabelDiv';
            colunclesLabelDiv.className = 'col col-mar';
            colunclesLabelDiv.innerText = 'Uncles Reward: ';
            var s = document.getElementById('blockContentRowDiv4');
            s.appendChild(colunclesLabelDiv);
            //timestamp value column
            var colunclesValueDiv = document.createElement('div');
            colunclesValueDiv.id = 'minedByValDiv';
            colunclesValueDiv.className = 'col-65 col-mar';
            colunclesValueDiv.innerText = result.uncles.length;
            var s = document.getElementById('blockContentRowDiv4');
            s.appendChild(colunclesValueDiv);

            //row 5
            var rowDiv5 = document.createElement('div');
            rowDiv5.id = 'blockContentRowDiv5';
            rowDiv5.className = 'row';
            document.body.appendChild(rowDiv5);
            //transaction label column
            var coltransactionLabelDiv = document.createElement('div');
            coltransactionLabelDiv.id = 'transactionLabelDiv';
            coltransactionLabelDiv.className = 'col col-mar';
            coltransactionLabelDiv.innerText = 'Transaction: ';
            var s = document.getElementById('blockContentRowDiv5');
            s.appendChild(coltransactionLabelDiv);
            //transaction value column
            var colalueDiv = document.createElement('div');
            colalueDiv.id = 'transactionValDiv';
            colalueDiv.className = 'col-65 col-blue col-mar';
            colalueDiv.innerText = result.transactions.length + ' transactions in this block';
            var s = document.getElementById('blockContentRowDiv5');
            s.appendChild(colalueDiv);

            //row 6
            var rowDiv6 = document.createElement('div');
            rowDiv6.id = 'blockContentRowDiv6';
            rowDiv6.className = 'row';
            document.body.appendChild(rowDiv6);
            //difficulty label column
            var colLabelDiv = document.createElement('div');
            colLabelDiv.id = 'difficultyLabelDiv';
            colLabelDiv.className = 'col col-mar';
            colLabelDiv.innerText = 'Difficulty: ';
            var s = document.getElementById('blockContentRowDiv6');
            s.appendChild(colLabelDiv);
            //difficulty value column
            var colalueDiv = document.createElement('div');
            colalueDiv.id = 'difficultyValDiv';
            colalueDiv.className = 'col-65 col-mar';
            colalueDiv.innerText = result.difficulty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var s = document.getElementById('blockContentRowDiv6');
            s.appendChild(colalueDiv);

            //row 7
            var rowDiv7 = document.createElement('div');
            rowDiv7.id = 'blockContentRowDiv7';
            rowDiv7.className = 'row';
            document.body.appendChild(rowDiv7);
            //totalDifficulty label column
            var colLabelDiv = document.createElement('div');
            colLabelDiv.id = 'totalDifficultyLabelDiv';
            colLabelDiv.className = 'col col-mar';
            colLabelDiv.innerText = 'Total Difficulty: ';
            var s = document.getElementById('blockContentRowDiv7');
            s.appendChild(colLabelDiv);
            //difficulty value column
            var colalueDiv = document.createElement('div');
            colalueDiv.id = 'totalDifficultyValDiv';
            colalueDiv.className = 'col-65 col-mar';
            colalueDiv.innerText = result.totalDifficulty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var s = document.getElementById('blockContentRowDiv7');
            s.appendChild(colalueDiv);

            //row 8
            var rowDiv8 = document.createElement('div');
            rowDiv8.id = 'blockContentRowDiv8';
            rowDiv8.className = 'row';
            document.body.appendChild(rowDiv8);
            //size label column
            var colLabelDiv = document.createElement('div');
            colLabelDiv.id = 'sizeLabelDiv';
            colLabelDiv.className = 'col col-mar';
            colLabelDiv.innerText = 'Total Difficulty: ';
            var s = document.getElementById('blockContentRowDiv8');
            s.appendChild(colLabelDiv);
            //difficulty value column
            var colalueDiv = document.createElement('div');
            colalueDiv.id = 'sizeValDiv';
            colalueDiv.className = 'col-65 col-mar';
            colalueDiv.innerText = result.size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' bytes';
            var s = document.getElementById('blockContentRowDiv8');
            s.appendChild(colalueDiv);

            //row 9
            var rowDiv9 = document.createElement('div');
            rowDiv9.id = 'blockContentRowDiv9';
            rowDiv9.className = 'row';
            document.body.appendChild(rowDiv9);
            //gasUsed label column
            var colLabelDiv = document.createElement('div');
            colLabelDiv.id = 'gasUsedLabelDiv';
            colLabelDiv.className = 'col col-mar';
            colLabelDiv.innerText = 'Gas Used: ';
            var s = document.getElementById('blockContentRowDiv9');
            s.appendChild(colLabelDiv);
            //difficulty value column
            var colalueDiv = document.createElement('div');
            colalueDiv.id = 'gasUsedValDiv';
            colalueDiv.className = 'col-65 col-mar';
            colalueDiv.innerText = result.gasUsed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' (' + ((result.gasUsed / result.gasLimit) * 100).toFixed(2) + '%)';
            var s = document.getElementById('blockContentRowDiv9');
            s.appendChild(colalueDiv);

            //row 10
            var rowDiv10 = document.createElement('div');
            rowDiv10.id = 'blockContentRowDiv10';
            rowDiv10.className = 'row';
            document.body.appendChild(rowDiv10);
            //gasLimit label column
            var colLabelDiv = document.createElement('div');
            colLabelDiv.id = 'gasLimitLabelDiv';
            colLabelDiv.className = 'col col-mar';
            colLabelDiv.innerText = 'Gas Limit: ';
            var s = document.getElementById('blockContentRowDiv10');
            s.appendChild(colLabelDiv);
            //difficulty value column
            var colalueDiv = document.createElement('div');
            colalueDiv.id = 'gasLimitValDiv';
            colalueDiv.className = 'col-65 col-mar';
            colalueDiv.innerText = result.gasLimit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var s = document.getElementById('blockContentRowDiv10');
            s.appendChild(colalueDiv);

            //append row and hr
            var l = document.getElementById('latestBlockListDiv');

            l.appendChild(rowDiv1);
            var rowhr = document.createElement('hr');
            rowhr.className = 'hr-space';
            l.appendChild(rowhr);

            l.appendChild(rowDiv2);
            var rowhr = document.createElement('hr');
            rowhr.className = 'hr-space';
            l.appendChild(rowhr);

            l.appendChild(rowDiv5);
            var rowhr = document.createElement('hr');
            rowhr.className = 'hr-space';
            l.appendChild(rowhr);

            l.appendChild(rowDiv3);
            var rowhr = document.createElement('hr');
            rowhr.className = 'hr-space';
            l.appendChild(rowhr);

            l.appendChild(rowDiv4);
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

            l.appendChild(rowDiv8);
            var rowhr = document.createElement('hr');
            rowhr.className = 'hr-space';
            l.appendChild(rowhr);

            l.appendChild(rowDiv9);
            var rowhr = document.createElement('hr');
            rowhr.className = 'hr-space';
            l.appendChild(rowhr);

            l.appendChild(rowDiv10);
            var rowhr = document.createElement('hr');
            rowhr.className = 'hr-space';
            l.appendChild(rowhr);
        }).catch((err) => {
            //append row
            var l = document.getElementById('latestBlockListDiv');
            l.innerHTML = "<span class='error-text'>Not a valid block number.</span>"
        });
    }
}

function searchFormSubmit(event) {
    var searchInputVal = document.getElementById("searchBTFormInput").value;
    let intValue = parseInt(searchInputVal)
    if (isNaN(intValue)) {
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

