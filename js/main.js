// Checks to see if the cell is neither empty nor NaN
// Changes cell to red if empty or NaN
// @param table ID of the table without #
// @param colNum letter of the column
// @param rowNum number of the row
// @return false if cell is either empty or NaN
function isSetNum(table, colNum, rowNum) {
    var empty = true;
    var cell = $('#' + table + ' input[name=' + colNum + rowNum + ']');
    if (cell.val()) empty = false;
    var result = !isNaN(cell.val()) && !empty;
    if (result) {
        cell.css('border','2px solid #0D243C');
    } else {
        cell.css('border','2px solid #F00');
        cell.val('0');
    }
    calcMoment(rowNum);
    return result;
}

// Calculates the Moment of a row by computing
// column A * column B = column C
// @param table ID of the table without #
// @param rowNum number of the row to be computed
function calcMoment(table, rowNum) {
        var a = $('#' + table + ' input[name=A' + rowNum + ']').val();
        var b = $('#' + table + ' input[name=B' + rowNum + ']').val();
        $('#' + table + ' input[name=C' + rowNum + ']').attr('value', a * b);
}

// Calculates the sum of of a column specified by 
// the start row of the column down to the end row of the column
// @param table ID of the table without #
// @param colNum letter of the column to be computed
// @param start number of the row to begin the sum
// @param end number of the row to finish the sum
// @return integer sum of the cells from row start to row end
function sum(table, colNum, start, end) {
    var result = 0;
    for (i = 0; i <= end-start; i++) {
        result += Number($('#' + table + ' input[name=' + colNum + (start +i) + ']').val());
    }
    return result;
}

// Calculates the subtraction of a column
// Eg. start - (all columns until end)
// @param table ID of the table without #
// @param colNum letter of the column to be computed
// @param start number of row to begin the subtraction
// @param end number of the row to finish subtraction
// @return integer of the subtraction between start - (all rows down to end)
function subtract(table, colNum, start, end) {
    var result = Number($('#' + table + ' input[name=' + colNum + start + ']').val());
    for (i = 1; i <= end-start; i++) {
        result -= Number($('#' + table + ' input[name=' + colNum + (start + i) + ']').val());
    }
    return result;
}

// Function for updating the BE-76 weight and balance table.
// Once a value has been changed, this function must be called
// to update the table. Returns data for drawing line on chart.
// @param colNum letter of the column that has been changed
// @param rowNum number of the row that has been changed
// @return data for updating table (e.g. data = [[10, 2],[4, 5]])
function updateBE76(colNum, rowNum) {
    var table = 'BE-76';
    if (isSetNum(table, colNum, rowNum)) {
        
        //Update Moment
        calcMoment(table, rowNum);
        // Sets row "Zero Fuel Total"
        var a = sum(table, 'A', 1, 4);
        var c = sum(table, 'C', 1, 4);
        $('#' + table + ' input[name=A5]').val(a);
        $('#' + table + ' input[name=B5]').val(Math.round((c/a) * 10 ) / 10);
        $('#' + table + ' input[name=C5]').val(c);
        // Sets "Ramp Weight"
        a = sum(table, 'A', 5, 6);
        c = sum(table, 'C', 5, 6);
        $('#' + table + ' input[name=A7]').val(a);
        $('#' + table + ' input[name=B7]').val(Math.round((c/a) * 10 ) / 10);
        $('#' + table + ' input[name=C7]').val(c);
        // Sets "Take-Off Weight"
        a = subtract(table, 'A', 7, 8);
        c = subtract(table, 'C', 7, 8);
        var x1 = c/a;
        var y1 = a;
        $('#' + table + ' input[name=A9]').val(a);
        $('#' + table + ' input[name=B9]').val(Math.round((c/a) * 10 ) / 10);
        $('#' + table + ' input[name=C9]').val(c);
        // Sets "Landing Weight"
        a = subtract(table, 'A', 9, 10);
        c = subtract(table, 'C', 9, 10);
        var x2 = c/a;
        var y2 = a;
        $('#' + table + ' input[name=A11]').val(a);
        $('#' + table + ' input[name=B11]').val(Math.round((c/a) * 10 ) / 10);
        $('#' + table + ' input[name=C11]').val(c);
        
        //Updating Chart
        var data = [[x1, y1], [x2, y2]];
        return data;
    }
}

// Created envelope for BE76
var dataBE76 = [{
        data: [[0, 0], [0, 1]],
        color: "blue",
        label: "In-Flight Weight Variation",
        points: { show: true },
        lines: { show: true }
    },
    {
        data: [[108.1, 3500], [117.5, 3500]],
        color: "red",
        label: "Maximum Zero Fuel Weight (3500 lbs)"
    },
    {
        data: [[106.6, 2400], [106.6, 3250], [110.6, 3900], [117.5, 3900], [117.5, 2400], [106.6, 2400]],
        color: "black"
    }];
    
var optionsBE76 = {
    xaxes: [{
        axisLabel: 'ARM (inches aft of datum)',
        axisLabelColour: 'black'
    }],
    yaxes: [{
        position: 'left',
        axisLabel: 'WEIGHT (lbs)',
        axisLabelColour: 'black'
    }],
    yaxis: { 
        max: 4200,
        min: 2350
    },
    xaxis: { 
        max: 120,
        min: 104
    }
}
    
// Function for updating the DA42 weight and balance table.
// Once a value has been changed, this function must be called
// to update the table. Returns data for drawing line on chart.
// @param colNum letter of the column that has been changed
// @param rowNum number of the row that has been changed
// @return data for updating table (e.g. data = [[10, 2],[4, 5]])
function updateDA42(colNum, rowNum) {
    var table = 'DA42';
    if (isSetNum(table, colNum, rowNum)) {
        
        //Update Moment
        calcMoment(table, rowNum);
        // Sets row "Zero Fuel Total"
        var a = sum(table, 'A', 1, 7);
        var c = sum(table, 'C', 1, 7);
        $('#' + table + ' input[name=A8]').val(a);
        $('#' + table + ' input[name=B8]').val(Math.round((c/a) * 10 ) / 10);
        $('#' + table + ' input[name=C8]').val(c);
        // Sets "Ramp Weight"
        a = sum(table, 'A', 8, 10);
        c = sum(table, 'C', 8, 10);
        $('#' + table + ' input[name=A11]').val(a);
        $('#' + table + ' input[name=B11]').val(Math.round((c/a) * 10 ) / 10);
        $('#' + table + ' input[name=C11]').val(c);
        // Sets "Take-Off Weight"
        a = subtract(table, 'A', 11, 12);
        c = subtract(table, 'C', 11, 12);
        var x1 = c/a;
        var y1 = a;
        $('#' + table + ' input[name=A13]').val(a);
        $('#' + table + ' input[name=B13]').val(Math.round((c/a) * 10 ) / 10);
        $('#' + table + ' input[name=C13]').val(c);
        // Sets "Landing Weight"
        a = subtract(table, 'A', 13, 15);
        c = subtract(table, 'C', 13, 15);
        var x2 = c/a;
        var y2 = a;
        $('#' + table + ' input[name=A16]').val(a);
        $('#' + table + ' input[name=B16]').val(Math.round((c/a) * 10 ) / 10);
        $('#' + table + ' input[name=C16]').val(c);
        
        //Updating Chart
        var data = [[x1, y1], [x2, y2]];
        return data;
    }
}

// Creates envelope for DA42
var dataDA42 = [{
        data: [[0, 0], [0, 1]],
        color: "blue",
        label: "In-Flight Weight Variation",
        points: { show: true },
        lines: { show: true }
    },
    {
        data: [[93.65, 3638], [98.03, 3638]],
        color: "red",
        label: "Maximum Zero Fuel Weight (3500 lbs)"
    },
    {
        data: [[92.52, 2756], [92.52, 3236], [94.49, 3935], [98.03, 3935], [98.03, 3527], [95.28, 2756], [92.52, 2756]],
        color: "black"
    }];
    
var optionsDA42 = {
    xaxes: [{
        axisLabel: 'ARM (inches aft of datum)',
        axisLabelColour: 'black'
    }],
    yaxes: [{
        position: 'left',
        axisLabel: 'WEIGHT (lbs)',
        axisLabelColour: 'black'
    }],
    yaxis: { 
        max: 4200,
        min: 2700
    },
    xaxis: { 
        max: 99,
        min: 92
    }
}

// Function for updating the PA44 weight and balance table.
// Once a value has been changed, this function must be called
// to update the table. Returns data for drawing line on chart.
// @param colNum letter of the column that has been changed
// @param rowNum number of the row that has been changed
// @return data for updating table (e.g. data = [[10, 2],[4, 5]])
function updatePA44(colNum, rowNum) {
    var table = 'PA44';
    if (isSetNum(table, colNum, rowNum)) {
        
        //Update Moment
        calcMoment(table, rowNum);
        // Sets row "Zero Fuel Total"
        var a = sum(table, 'A', 1, 4);
        var c = sum(table, 'C', 1, 4);
        $('#' + table + ' input[name=A5]').val(a);
        $('#' + table + ' input[name=B5]').val(Math.round((c/a) * 10 ) / 10);
        $('#' + table + ' input[name=C5]').val(c);
        // Sets "Ramp Weight"
        a = sum(table, 'A', 5, 6);
        c = sum(table, 'C', 5, 6);
        $('#' + table + ' input[name=A7]').val(a);
        $('#' + table + ' input[name=B7]').val(Math.round((c/a) * 10 ) / 10);
        $('#' + table + ' input[name=C7]').val(c);
        // Sets "Take-Off Weight"
        a = subtract(table, 'A', 7, 8);
        c = subtract(table, 'C', 7, 8);
        var x1 = c/a;
        var y1 = a;
        $('#' + table + ' input[name=A9]').val(a);
        $('#' + table + ' input[name=B9]').val(Math.round((c/a) * 10 ) / 10);
        $('#' + table + ' input[name=C9]').val(c);
        // Sets "Landing Weight"
        a = subtract(table, 'A', 9, 10);
        c = subtract(table, 'C', 9, 10);
        var x2 = c/a;
        var y2 = a;
        $('#' + table + ' input[name=A11]').val(a);
        $('#' + table + ' input[name=B11]').val(Math.round((c/a) * 10 ) / 10);
        $('#' + table + ' input[name=C11]').val(c);
        
        //Updating Chart
        var data = [[x1, y1], [x2, y2]];
        return data;
    }
}

// Created envelope for BE76
var dataPA44 = [{
        data: [[0, 0], [0, 1]],
        color: "blue",
        label: "In-Flight Weight Variation",
        points: { show: true },
        lines: { show: true }
    },
    {
        data: [[84, 2500], [84, 2800], [85, 3400], [89, 3800], [93, 3800], [93, 2500], [84, 2500]],
        color: "black"
    }];
    
var optionsPA44= {
    xaxes: [{
        axisLabel: 'ARM (inches aft of datum)',
        axisLabelColour: 'black'
    }],
    yaxes: [{
        position: 'left',
        axisLabel: 'WEIGHT (lbs)',
        axisLabelColour: 'black'
    }],
    yaxis: { 
        max: 4000,
        min: 2450
    },
    xaxis: { 
        max: 94,
        min: 83
    }
}

$(function() {
    // BE76 Table and Graph
    var BE76plot = $.plot($("#BE76Graph"), dataBE76, optionsBE76);
    // BE-76 table events (cells that can be changed)
    $('#BE-76 input[name=A1]').blur(function() {
        dataBE76[0].data = updateBE76('A','1');
        BE76plot.setData(dataBE76);
        BE76plot.draw();
    });
    $('#BE-76 input[name=B1]').blur(function() {
        dataBE76[0].data = updateBE76('B','1');
        BE76plot.setData(dataBE76);
        BE76plot.draw();
    });
    $('#BE-76 input[name=A2]').blur(function() {
        dataBE76[0].data = updateBE76('A','2');
        BE76plot.setData(dataBE76);
        BE76plot.draw();
    });
    $('#BE-76 input[name=A3]').blur(function() {
        dataBE76[0].data = updateBE76('A','3');
        BE76plot.setData(dataBE76);
        BE76plot.draw();
    });
    $('#BE-76 input[name=A4]').blur(function() {
        dataBE76[0].data = updateBE76('A','4');
        BE76plot.setData(dataBE76);
        BE76plot.draw();
    });
    $('#BE-76 input[name=A6]').blur(function() {
        dataBE76[0].data = updateBE76('A','6');
        BE76plot.setData(dataBE76);
        BE76plot.draw();
    });
    $('#BE-76 input[name=A8]').blur(function() {
        dataBE76[0].data = updateBE76('A','8');
        BE76plot.setData(dataBE76);
        BE76plot.draw();
    });
    $('#BE-76 input[name=A10]').blur(function() {
        dataBE76[0].data = updateBE76('A','10');
        BE76plot.setData(dataBE76);
        BE76plot.draw();
    });
    
    // DA42 Table and Graph
    var DA42plot = $.plot($("#DA42Graph"), dataDA42, optionsDA42);
    // DA42 table events (cells that can be changed)
    $('#DA42 input[name=A1]').blur(function() {
        dataDA42[0].data = updateDA42('A','1');
        DA42plot.setData(dataDA42);
        DA42plot.draw();
    });
    $('#DA42 input[name=B1]').blur(function() {
        dataDA42[0].data = updateDA42('B','1');
        DA42plot.setData(dataDA42);
        DA42plot.draw();
    });
    $('#DA42 input[name=A2]').blur(function() {
        dataDA42[0].data = updateDA42('A','2');
        DA42plot.setData(dataDA42);
        DA42plot.draw();
    });
    $('#DA42 input[name=A3]').blur(function() {
        dataDA42[0].data = updateDA42('A','3');
        DA42plot.setData(dataDA42);
        DA42plot.draw();
    });
    $('#DA42 input[name=A4]').blur(function() {
        dataDA42[0].data = updateDA42('A','4');
        DA42plot.setData(dataDA42);
        DA42plot.draw();
    });
    $('#DA42 input[name=A5]').blur(function() {
        dataDA42[0].data = updateDA42('A','5');
        DA42plot.setData(dataDA42);
        DA42plot.draw();
    });
    $('#DA42 input[name=A6]').blur(function() {
        dataDA42[0].data = updateDA42('A','6');
        DA42plot.setData(dataDA42);
        DA42plot.draw();
    });
    $('#DA42 input[name=A7]').blur(function() {
        dataDA42[0].data = updateDA42('A','7');
        DA42plot.setData(dataDA42);
        DA42plot.draw();
    });
    $('#DA42 input[name=A9]').blur(function() {
        dataDA42[0].data = updateDA42('A','9');
        DA42plot.setData(dataDA42);
        DA42plot.draw();
    });
    $('#DA42 input[name=A10]').blur(function() {
        dataDA42[0].data = updateDA42('A','10');
        DA42plot.setData(dataDA42);
        DA42plot.draw();
    });
    $('#DA42 input[name=A12]').blur(function() {
        dataDA42[0].data = updateDA42('A','12');
        DA42plot.setData(dataDA42);
        DA42plot.draw();
    });
    $('#DA42 input[name=A14]').blur(function() {
        dataDA42[0].data = updateDA42('A','14');
        DA42plot.setData(dataDA42);
        DA42plot.draw();
    });
    $('#DA42 input[name=A15]').blur(function() {
        dataDA42[0].data = updateDA42('A','15');
        DA42plot.setData(dataDA42);
        DA42plot.draw();
    });
    
    // PA44 Table and Graph
    var PA44plot = $.plot($("#PA44Graph"), dataPA44, optionsPA44);
    // PA44 table events (cells that can be changed)
    $('#PA44 input[name=A1]').blur(function() {
        dataPA44[0].data = updatePA44('A','1');
        PA44plot.setData(dataPA44);
        PA44plot.draw();
    });
    $('#PA44 input[name=B1]').blur(function() {
        dataPA44[0].data = updatePA44('B','1');
        PA44plot.setData(dataPA44);
        PA44plot.draw();
    });
    $('#PA44 input[name=A2]').blur(function() {
        dataPA44[0].data = updatePA44('A','2');
        PA44plot.setData(dataPA44);
        PA44plot.draw();
    });
    $('#PA44 input[name=A3]').blur(function() {
        dataPA44[0].data = updatePA44('A','3');
        PA44plot.setData(dataPA44);
        PA44plot.draw();
    });
    $('#PA44 input[name=A4]').blur(function() {
        dataPA44[0].data = updatePA44('A','4');
        PA44plot.setData(dataPA44);
        PA44plot.draw();
    });
    $('#PA44 input[name=A6]').blur(function() {
        dataPA44[0].data = updatePA44('A','6');
        PA44plot.setData(dataPA44);
        PA44plot.draw();
    });
    $('#PA44 input[name=A8]').blur(function() {
        dataPA44[0].data = updatePA44('A','8');
        PA44plot.setData(dataPA44);
        PA44plot.draw();
    });
    $('#PA44 input[name=A10]').blur(function() {
        dataPA44[0].data = updatePA44('A','10');
        PA44plot.setData(dataPA44);
        PA44plot.draw();
    });
});