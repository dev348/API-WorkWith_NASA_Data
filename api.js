
// const xs = [];
// const ys = [];
chartIt();
async function chartIt(){

const data = await getData();
const ctx = document.getElementById('chart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.xs,
        datasets: [{
            label: 'Combined Land-Surface Air and Sea-Surface Water Temperature Anomalies (Land-Ocean Temperature Index, L-OTI) °',
            data: data.ys,
            fill:false,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor:  'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }],

    },
    options: {
        scales: {
            y: {
                ticks: {
                   
                    callback: function(value, index, ticks) {
                        return '°' + value;
                    }
                }
            }
        }
    }
});

}

async function getData(){
    const xs =[];
    const ys =[];
    const response = await fetch('./ZonAnn.Ts+dSST.csv');
    const data = await response.text();
    // console.log(data);

    const table = data.split('\n').slice(1);
    // console.log(rows);
    table.forEach(row =>{
        const columns = row.split(',');
        const year = columns[0];
        const temp = columns[1];
    
        console.log(year,temp);
        xs.push(year);
        ys.push(parseFloat(temp)+14);
    });
    return {xs,ys};
}