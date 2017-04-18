
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

// Weekday Bar Graph ###########################################################

var weekdayCo2BarChart;
function updateWeekdayCo2BarChart(response) {

    // Make bar of percent of different CO2 source types
    var ctx_bar = $("#weekdayBarChart");
    var yearData = {};

    if (weekdayCo2BarChart) {
        weekdayCo2BarChart.destroy();
    }
    
    yearData.year = $("#weekday-year").val();

    $.get("/co2-day-of-week.json", yearData, function (response) {

        var data = {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
                     "Saturday", "Sunday"],
            datasets: [
                {
                    label: "Electricity Footprint",
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1,
                    data: response.kwh,
                },
                {
                    label: "Trip Footprint",
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1,
                    data: response.trip,
                }
            ]
        };
    

        weekdayCo2BarChart = new Chart(ctx_bar, {
            type: 'bar',
            data: data,
            options: options
        });
    });
}

updateWeekdayCo2BarChart();
$("#weekday-year").on("change", updateWeekdayCo2BarChart);


// Get Zipcode ################################################################

$("#new-location-button").on("click", getZipcode);
    
function getZipcode(evt) {
    evt.preventDefault();

    var city = $("#city");
    var state = $("#state");

    var data = {};
        data.city = city.val();
        data.state = state.val();

    $.ajax({
        url: "/get-zipcode",
        data: data,
        success: function(response) {
            // change the distance in the dom to the response
            $("#zipcode").val(response);
            compareLocations();
        }
    });
}

// Compare Locations ##########################################################

// only need this when the zipcode is unhidden, to save on 
// $("#zipcode").on("change", compareLocations);

// Should only update graph if zipcode has a value
$("#location-year").on("change", function () {
    if ($("#zipcode").val()) {
        compareLocations();
    }
});

function compareLocations(evt) {
    var year = $("#location-year");
    var zipcode = $("#zipcode");

    var data = {};
        data.year= year.val();
        data.zipcode = zipcode.val();

    $.ajax({
        url: "/co2-other-location.json",
        data: data,
        success: function(response) {
            $("#location-comparison").show();
            
            $("#current-yr-total").html(response.current_yearly_co2);
            $("#new-yr-total").html(response.new_yearly_co2);
            $("#current-dly-rate").html(response.current_daily_rate);
            $("#new-dly-rate").html(response.new_daily_rate);
            $("#comparison-statement").html(response.comparison_statement);

            updateLocationBarChart(response);
        }
    });
}

// Location Bar Graph #########################################################

var locationBarChart;
function updateLocationBarChart(response) {

    // Make bar of percent of different CO2 source types
    var ctx_bar = $("#locationBarChart");

    if (locationBarChart) {
        locationBarChart.destroy();
    }
    
    var data = {
        labels: ["January", "February", "March", "April", "May", "June",
                 "July", "August", "September", "October", "November",
                 "December"],
        datasets: [
            {
                label: "Current Location",
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,
                data: response.current_monthly_co2,
            },

            {
                label: "New Location",
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
                data: response.new_monthly_co2,
            }
        ]
    };
    
    locationBarChart = new Chart(ctx_bar, {
        type: 'bar',
        data: data,
        options: options
    });
        
}

// Compare Cars ###############################################################


$("#new-car-button").on("click", compareCars);

// Should only update graph if new car has values
$("#trip-year").on("change", function () {
    if ($("#make").val() && $("#model").val() && $("#car-year").val()) {
        compareCars();
    }
});

function compareCars(evt) {
    evt.preventDefault();

    var tripYear = $("#trip-year");
    var make = $("#make");
    var model = $("#model");
    var carYear = $("#car-year");
    var cylinders = $("#cylinders");
    var transmission = $("#transmission");
    var userCarId = $("#my-car");

    var data = {};
        data.tripYear = tripYear.val();
        data.make = make.val();
        data.model = model.val();
        data.carYear = carYear.val();
        data.cylinders = cylinders.val();
        data.transmission = transmission.val();
        data.userCarId = userCarId.val();

    $.ajax({
        url: "/co2-other-car.json",
        data: data,
        success: function(response) {
            $("#car-comparison").show();
            
            $("#currentCar-yr-total").html(response.current_yearly_co2);
            $("#newCar-yr-total").html(response.new_yearly_co2);
            $("#currentCar-dly-rate").html(response.current_daily_rate);
            $("#newCar-dly-rate").html(response.new_daily_rate);
            $("#car-comparison-statement").html(response.comparison_statement);

            updateCarBarChart(response);
        }
    });
}

// Car Bar Graph ##############################################################

var carBarChart;
function updateCarBarChart(response) {

    // Make bar of percent of different CO2 source types
    var ctx_bar = $("#carBarChart");

    if (carBarChart) {
        carBarChart.destroy();
    }
    
    var data = {
        labels: ["January", "February", "March", "April", "May", "June",
                 "July", "August", "September", "October", "November",
                 "December"],
        datasets: [
            {
                label: "Current Car",
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,
                data: response.current_monthly_co2,
            },

            {
                label: "New Car",
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
                data: response.new_monthly_co2,
            }
        ]
    };
    
    carBarChart = new Chart(ctx_bar, {
        type: 'bar',
        data: data,
        options: options
    });
        
}
