
var options = {
  responsive: true
};


// DONUT CHART ################################################################

var myDonutChart;
function updateCo2Donut() {

    // Make Donut Chart of percent of different CO2 source types
    var ctx_donut = $("#donutChart");
    var yearData = {};
    yearData.year = $("#donut-year").val();

    if (myDonutChart) {
        myDonutChart.destroy();
    }
    $.get("/co2-per-datatype.json", yearData, function (response) {
        var data = {
            labels: [
                "Trip",
                "Electricity",
                "Natural Gas"
            ],
            datasets: [
                {
                    data: response,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            };
        myDonutChart = new Chart(ctx_donut, {
            type: 'doughnut',
            data: data,
            options: options
        });
        
    });
}
updateCo2Donut();
$("#donut-year").on("change", updateCo2Donut);


// LINE GRAPH ################################################################

var myLineChart;
function updateCo2LineGraph() {

    // Make Donut Chart of percent of different CO2 source types
    var ctx_line = $("#lineGraph");
    var yearData = {};
    yearData.year = $("#trend-year").val();

    if (myLineChart) {
        myLineChart.destroy();
    }
    $.get("/co2-trend.json", yearData, function (response) {

        var data = {
            labels: ["January", "February", "March", "April", "May", "June",
                     "July", "August", "September", "October", "November",
                     "December"],
            datasets: [
                {
                    label: "Trips",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: response.trip,
                    spanGaps: false,
                },
                {
                    label: "Electricity",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "#36A2EB",
                    borderColor: "#36A2EB",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#36A2EB",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#36A2EB",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: response.kwh,
                    spanGaps: false,
                },
                {
                    label: "Natural Gas",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "#FFCE56",
                    borderColor: "#FFCE56",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#FFCE56",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#FFCE56",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: response.ng,
                    spanGaps: false,
                }
            ]
        };
        
        myLineChart = new Chart(ctx_line, {
            type: 'line',
            data: data,
            options: options
        });
        
    });
}
updateCo2LineGraph();
$("#trend-year").on("change", updateCo2LineGraph);
