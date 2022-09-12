var _recentBlockNumber;
document.addEventListener('DOMContentLoaded', () => {
    console.log('app.events.serivce.js started!!!');
    loadRecentNBlocks();
    loadRecentBlcTransactions();
    // loadChart();
});

function loadRecentBlcTransactions() {
    //loader
    var loadDiv = document.createElement('div');
    loadDiv.id = 'loader'
    loadDiv.className = 'loader';
    document.body.appendChild(loadDiv);
    var l = document.getElementById('latestTransListDiv');
    l.appendChild(loadDiv);

    infura_web3.eth.getBlockNumber().then((result) => {
        _recentBlockNumber = result;
        GetRecentTransactionByRecentBlock(_recentBlockNumber, 10).then((result) => {
            //loader remove from dom
            if (result != null) {
                var l = document.getElementById('latestTransListDiv');
                l.removeChild(loadDiv);
            }
            result.forEach((item, index) => {
                if (item == null) {
                    return;
                }
                var rowDiv = document.createElement('div');
                rowDiv.id = 'transcationContentRowDiv' + index;
                rowDiv.className = 'row';
                document.body.appendChild(rowDiv);

                //block icon column
                var span = document.createElement('span');
                span.className = "span-btn btn-icon btn-soft-secondary rounded-circle";
                var innerSpan = document.createElement('span');
                innerSpan.className = "btn-icon__inner text-dark";
                innerSpan.innerText = "Tx";
                span.appendChild(innerSpan);
                var colTxIconDiv = document.createElement('div');
                colTxIconDiv.id = 'txBlockIconDiv' + index;
                colTxIconDiv.className = 'col-nw';
                colTxIconDiv.appendChild(span);
                var s = document.getElementById('transcationContentRowDiv' + index);
                s.appendChild(colTxIconDiv);

                //hash column
                var colHashDiv = document.createElement('div');
                colHashDiv.id = 'txColHashDiv' + index;
                colHashDiv.className = 'col col-blue col-mar';
                colHashDiv.innerText = item?.hash.substr(0, 10) + '...';
                var s = document.getElementById('transcationContentRowDiv' + index);
                s.appendChild(colHashDiv);

                //from column
                var colFromDiv = document.createElement('div');
                colFromDiv.id = 'txColFromDiv' + index;
                colFromDiv.className = 'col col-blue';
                let from = '<span style="color:black">From </span>' + item?.from.substr(0, 12) + '...<br>';
                let to = '<span style="color:black">To </span>' + item?.to.substr(0, 14) + '...';
                colFromDiv.innerHTML = from + to;
                var s = document.getElementById('transcationContentRowDiv' + index);
                s.appendChild(colFromDiv);

                //amount column
                var colAmountDiv = document.createElement('div');
                colAmountDiv.className = 'col-nw-right col-mar';
                colAmountDiv.innerHTML = '<span class="d-inline-block d-sm-none"><span class="u-label u-label--xs u-label--badge-in u-label--secondary text-center text-nowrap" title="Amount">'
                    + 0 +
                    ' Eth</span></span>'
                var s = document.getElementById('transcationContentRowDiv' + index);
                s.appendChild(colAmountDiv);


                //append row and hr
                var l = document.getElementById('latestTransListDiv');
                l.appendChild(rowDiv);
                var rowhr = document.createElement('hr');
                rowhr.className = 'hr-space';
                l.appendChild(rowhr);

            });
        });
    });
}

function loadRecentNBlocks() {
    //loader
    var loadDiv = document.createElement('div');
    loadDiv.id = 'loader'
    loadDiv.className = 'loader';
    document.body.appendChild(loadDiv);
    var l = document.getElementById('latestBlockListDiv');
    l.appendChild(loadDiv);

    GetRecentNBlocks(10).then((result) => {
        //loader remove from dom
        if (result != null) {
            var l = document.getElementById('latestBlockListDiv');
            l.removeChild(loadDiv);
        }
        result.forEach((item, index) => {
            if (item == null) {
                return;
            }
            var rowDiv = document.createElement('div');
            rowDiv.id = 'blockContentRowDiv' + index;
            rowDiv.className = 'row';
            document.body.appendChild(rowDiv);

            //block icon column
            var span = document.createElement('span');
            span.className = "span-btn btn-icon btn-soft-secondary";
            var innerSpan = document.createElement('span');
            innerSpan.className = "btn-icon__inner text-dark";
            innerSpan.innerText = "Bk";
            span.appendChild(innerSpan);
            var colBlockIconDiv = document.createElement('div');
            colBlockIconDiv.id = 'bcBlockIconDiv' + index;
            colBlockIconDiv.className = 'col-nw';
            colBlockIconDiv.appendChild(span);
            var s = document.getElementById('blockContentRowDiv' + index);
            s.appendChild(colBlockIconDiv);

            //number column
            var colNumberDiv = document.createElement('div');
            colNumberDiv.id = 'bcColNumberDiv' + index;
            colNumberDiv.className = 'col col-blue col-mar';
            colNumberDiv.innerText = item?.number;
            var s = document.getElementById('blockContentRowDiv' + index);
            s.appendChild(colNumberDiv);

            //transactions column
            var colTransDiv = document.createElement('div');
            colTransDiv.id = 'bcColTransDiv' + index;
            colTransDiv.className = 'col col-blue col-mar';
            colTransDiv.innerText = item?.transactions?.length + ' txns';
            var s = document.getElementById('blockContentRowDiv' + index);
            s.appendChild(colTransDiv);

            //block reward column
            var colBlockRewardDiv = document.createElement('div');
            colBlockRewardDiv.className = 'col-nw-right col-mar';
            colBlockRewardDiv.innerHTML = '<span class="d-inline-block d-sm-none"><span class="u-label u-label--xs u-label--badge-in u-label--secondary text-center text-nowrap" title="Block Reward">Eth</span></span>'
            var s = document.getElementById('blockContentRowDiv' + index);
            s.appendChild(colBlockRewardDiv);


            //append row and hr
            var l = document.getElementById('latestBlockListDiv');
            l.appendChild(rowDiv);
            var rowhr = document.createElement('hr');
            rowhr.className = 'hr-space';
            l.appendChild(rowhr);

        });
    });
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

function loadChart() {
    var xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
    var yValues = [7, 20, 30];

    new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{ ticks: { min: 6, max: 10 } }],
            }
        }
    });
}

