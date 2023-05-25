// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

/*
WAIT TO APPLY JS UNTILL AFTER WINDOW IS LOADED
SETS UP THE BUTTONS DISPLAYED ON SCREEN
*/
window.onload = function () {
  // setup add task Button function
  var addButton = document.getElementById("addTask");
  addButton.onclick = addTask;

  // setup add invocation Button function
  var addInvButton = document.getElementById("addInvocation");
  addInvButton.onclick = addInvocation;

  // setup remove Invocation Button
  var removeInvButton = document.getElementById('removeInvocation');
  removeInvButton.onclick = removeInvocation;

  // setup add freq button function
  var addFreqButton = document.getElementById("addFrequency");
  addFreqButton.onclick = addFrequency;

  // setup remove freq Button
  var removeFreqButton = document.getElementById('removeFrequency');
  removeFreqButton.onclick = removeFrequency;

  // set up simulate button
  var simulateButton = document.getElementById('simulate');
  simulateButton.onclick = simulate;

  // add row to table
  addTask();

  // add task help popup
  var taskHelpButton = document.getElementById('toggleTaskHelp');
  taskHelpButton.onclick = popupTaskHelp;

  // add freq help popup
  var freqHelpButton = document.getElementById('toggleFreqHelp');
  freqHelpButton.onclick = popupFreqHelp;

  // add sim help popup
  var simHelpButton = document.getElementById('toggleSimHelp');
  simHelpButton.onclick = popupSimHelp;
}

/*
Update graph dimensions when resizing program window
*/
window.onresize = function() {
  var graph = document.getElementById('outputGraph');
  Plotly.Plots.resize(graph);
}; 

/*
ADD TASK
adds a new row to task input table in HTML DOM
also builds a delete task button for the new task
*/
const addTask = function () {
  // get table body
  var table = document.getElementById("tasks");

  // create table row for task
  var task = document.createElement('tr');

  // create id for task
  var lastId = table.lastElementChild.id;
  if (lastId == 'header') {
    task.id = 'T0';
  }
  else {
    var number = parseInt(lastId.substring(1));
    task.id = 'T' + (number + 1);
  }

  // create delete button
  var deleteCell = document.createElement('td');
  var deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Delete';
  deleteButton.style.width = "5em";
  deleteButton.onclick = function () {
    var deleteTask = this.parentElement.parentElement;
    // check if deleting only task
    if (deleteTask.parentElement.childElementCount > 2) {
      tasks.removeChild(deleteTask);
    }
  }
  deleteCell.appendChild(deleteButton);
  task.appendChild(deleteCell);

  // create name input 
  var nameCell = document.createElement('td');
  var name = document.createElement('input');
  name.type = 'text';
  nameCell.appendChild(name);
  task.appendChild(nameCell);

  // create WC time input
  var worstCaseCell = document.createElement('td');
  var worstCase = document.createElement('input');
  worstCase.type = 'number';
  worstCaseCell.appendChild(worstCase);
  task.appendChild(worstCaseCell);

  // create period input
  var periodCell = document.createElement('td');
  var period = document.createElement('input');
  period.type = 'number';
  periodCell.appendChild(period);
  task.appendChild(periodCell);

  // get header element
  var header = document.getElementById('header');

  // get # invocations
  var invocations = header.childElementCount - 4;

  // add invocations
  for (var i = 0; i < invocations; i++) {
    var cell = document.createElement('td');
    var input = document.createElement('input');
    input.type = 'number';
    cell.appendChild(input);
    task.appendChild(cell);
  }

  // add task row to bottom of table
  table.appendChild(task);
}

/*
ADD INVOCATION
adds a new column to the end of the task input table in hTML DOM
*/
const addInvocation = function () {
  // get table body and its rows
  var table = document.getElementById("tasks");
  var rows = table.children;

  // loop through children
  for (var i = 0; i < table.childElementCount; i++) {
    // get row 
    var row = rows.item(i);
    // add header row
    if (i == 0) {
      // child 4 is invocation 1
      var invocation = row.childElementCount - 3;
      // build cell
      var cell = document.createElement('th');
      cell.innerHTML = "Invocation " + invocation;
      // add header element to first row
      row.appendChild(cell);
    }
    else {
      // add text box
      var cell = document.createElement('td');
      var text = document.createElement('input');
      text.type = 'number';
      cell.appendChild(text);
      // add cell to row
      row.appendChild(cell);
    }
  }
}

/*
REMOVE INVOCATION
removes the last column from the task input table in HTML DOM
*/
const removeInvocation = function () {
  // get table body and its rows
  var table = document.getElementById("tasks");
  var rows = table.children;

  // loop through rows
  for (var i = 0; i < table.childElementCount; i++) {
    // get row 
    var row = rows.item(i);
    // check if an invocation to remove
    if (row.childElementCount <= 4) {

    }
    // remove last invocation cell from row
    else {
      var cell = row.lastElementChild;
      row.removeChild(cell);
    }

  }
}

/*
ADD FREQUENCY
adds a new frequency input box to the frequency input table
only used if there are a limited number of usable frequencies
*/
const addFrequency = function () {
  // get frequency table row
  var table = document.getElementById('frequencies');
  var row = table.firstElementChild;
  // create new element
  var cell = document.createElement('td');
  var input = document.createElement('input');
  input.type = 'number';
  input.min = 0;
  input.max = 1;
  // add element to table
  cell.appendChild(input);
  row.appendChild(cell);

}

/*
REMOVE FREQUENCY
removes the last frequency from the frequency input table
*/
const removeFrequency = function () {
  // get frequency table row
  var table = document.getElementById('frequencies');
  var row = table.firstElementChild;
  // check if any frequencies ti remove
  if (row.childElementCount > 1) {
    // remove last child
    var cell = row.lastElementChild;
    row.removeChild(cell);
  }
}

/*
POPUP FUNCTIONs
*/
const popupTaskHelp = function () {
  // get div to popup
  var popup = document.getElementById("popupTask");
  // toggle the show class
  popup.classList.toggle("show");
}
const popupFreqHelp = function () {
  // get div to popup
  var popup = document.getElementById("popupFreq");
  // toggle the show class
  popup.classList.toggle("show");
}
const popupSimHelp = function () {
  // get div to popup
  var popup = document.getElementById("popupSim");
  // toggle the show class
  popup.classList.toggle("show");
}

/*
SIMULATE SCHEDULE
this is the structure of our code and is run by simulation button
*/
const simulate = function () {
  // get user inputs
  var input = getUserInput();

  // apply Look Ahead EDF
  var output = applyLookAheadEDF(input);

  // draw output graph
  drawGraph2(output);

  // display output
  displayOutputList(output);
}

/*
GET USER INPUT
reads everything user has inputted to tables
builds input object for algorithm

input = {simulationTime, tasks, frequencies} = object
simulationTime = number
tasks = [task, task, task, ...] = array
task = {name, worstCase, period, invocations} = object
name = text
worstCase = number
period = number
invocations = [invocation, invocation, invocation, ...] = array
invocation = number
frequencies = [freq, freq, freq, ...] = array
freq = number
*/
function getUserInput() {
  // get task table and rows
  var table = document.getElementById('tasks');
  var rows = table.children;

  // initialize array to hold tasks
  var tasks = [];

  // loop through rows of table (ignoring header row)
  for (var i = 1; i < rows.length; i++) {
    // get current row 
    var row = rows[i];
    // get cells
    var cells = row.children;

    // get first child of row (delete cell)
    var cell = cells[0];

    // get name of task
    cell = cells[1];
    var name = cell.firstElementChild.value;

    // get worst case for task
    cell = cells[2];
    var worstCase = cell.firstElementChild.value;

    // get period for task
    cell = cells[3];
    var period = cell.firstElementChild.value;

    // initialize invocations array
    var invocations = [];

    // loop through invocations
    for (var j = 4; j < row.childElementCount; j++) {
      // get current invocation
      cell = cells[j];
      var invocation = parseFloat(cell.firstElementChild.value);
      // add invocation to array
      invocations.push(invocation);
    }

    // build task object
    var task = {
      name: name,
      worstCase: parseFloat(worstCase),
      period: parseFloat(period),
      invocations: invocations,
    }

    // add task to array
    tasks.push(task);
  }

  // get frequency cells
  var freqTable = document.getElementById('frequencies');
  var freqRow = freqTable.firstElementChild;
  var freqCells = freqRow.children;

  // initialize list of frequencies
  var freqs = [];

  // loop through cells of frequency table (skipping first one)
  for (var i = 1; i < freqCells.length; i++) {
    // get current cell
    var cell = freqCells.item(i);
    // get freq value
    var freq = parseFloat(cell.firstElementChild.value);
    // add freq to list
    freqs.push(freq);
  }

  // get simulation time
  var simulationTime = document.getElementById('endTime').value;

  // build input object
  var input = {
    simulationTime: parseFloat(simulationTime),
    tasks: tasks,
    frequencies: freqs
  }

  // return algorithm input object
  return input;
}

/*
ALGORITHM TO APPLY LOOK AHEAD EDF
TAKES INPUT DATA FROM USER AS OBJECT
RETURNS OUTPUT DATA FOR GRAPH AS OBJECT
FORMAT OF INPUT/OUTPUT SHOWN IN 'simulate' FUNCTION AS SAMPLE INPUT/OUTPUT
*/
function applyLookAheadEDF(inp) {
  tasksarray = []; // Array in which tasks will be stored

    for (var m of inp.tasks) { // For loop copies all inputted tasks into tasksarray
        tasksarray.push(m);
    }

    var arraylength = tasksarray.length; // Variable stores length of tasks array
    var newarraylength = 0; // Variable will be storing new tasks array length as tasks get iterated through to increment periods up to the simulation time 
    var j = 0; // Stores a count for restarting

    restartLoop:
    while (true){
    newarraylength = tasksarray.length; //Everytime for loop is iterated through new task array length is updated
    j = 0; // Count is reset as loop is restarting
    for (var i = (newarraylength - arraylength); i < newarraylength; i++){ // For loop iterated through the last three elements of the new tasks array to get updated deadlines
        var task = new Object(); // Task stores a copy of the input task that is currently being iterated on
        task.name = tasksarray[i].name;
        task.worstCase = tasksarray[i].worstCase;
        task.period =  tasksarray[i].period;
        task.invocations =  tasksarray[i].invocations;

        var per = task.period; // Stores period of current task being iterated on 

        task.period = per + tasksarray[j].period; // Adds period to last deadline calculated i.e. if last iteration T1 was on 36 and the period is 6 task.period = 42
        tasksarray.push(task); // Appends task with next deadline into the tasks array

        j++; // Increments restart counter for loop

        if ( j == (arraylength) && tasksarray[newarraylength - arraylength].period <= inp.simulationTime){ // If for loop reaches end and array hasnt met simulation time restart loop
            continue restartLoop;
        }
    }
    break;
    }

    numofinvocations = inp.tasks[0].invocations.length; // Variable stores number of invocations based on first task
    tasksarray.sort(compare); // Sorts tasks based on period
    newarraylength2 = tasksarray.length; // Stores length of tasks stored with all deadlines iterated through till simulation time
    newtasksarray = []; // Array for tasks based on invocations 

    // Loop filters throught previous tasks array and eliminates any tasks more then the number of invocations
    for (var l = 0; l < inp.tasks.length; l++){ // Loops through number of tasks
        count = 0; // Count variable
        for(var k = 0; k < newarraylength2; k++){ // For loop iterates thorugh all the values in tasks array
            if (inp.tasks[l].name == tasksarray[k].name && count < numofinvocations){ // If name of task is the same as for loop iteration append it to the new tasks array based on the number of invocations
                let invstore = tasksarray[k].invocations[count];
                tasksarray[k].invocations = [];
                tasksarray[k].invocations.push(invstore);
                newtasksarray.push(tasksarray[k]);
                count = count + 1;
            }
        }
    }

    newtasksarray.sort(compare); // Sorts array based on invocations by deadlines
    //console.log(newtasksarray);
    //console.log(inp);

    let output = new Object(); // New Object for output

    output.simulationTime = inp.simulationTime; //Copy simulation time to Output
    output.tasks = [];  //Create an empty task array fo output
    output.frequencies = inp.frequencies;
    
    for (var r = 0; r < inp.tasks.length; r++){ //For number of tasks in input create Objects in tasks array for output
        let task = new Object();
        task.name = inp.tasks[r].name;
        task.releases = [];
        task.startTimes = [];
        task.durations = [];
        task.frequencies = [];
        task.missedDeadlines = [];
        output.tasks.push(task);
    }

    time = 0; // Set time to 0 
    frequenciesarray = [];
    for (var z of inp.frequencies) { // For loop copies all inputted frequencies into frequenciesarray
        frequenciesarray.push(z);
    }
    frequenciesarray.sort(); // Sorts frequency values based on values
    lookaheadlength = inp.tasks.length; // Stores number of tasks


    for (var n = 0; n < newtasksarray.length; n++){ //Loops thorugh all the task in new tasks array organized with iteratiosn and deadlines
        
        let elementvalue = inp.tasks.findIndex(element =>  element.name === newtasksarray[n].name); // Finds index value in original input tasks array

        Defersum = 0 // Stores sum fo all Deferred values
        Utilization = 0 // Utilization Value

        if (newtasksarray.length - n < lookaheadlength){ // As n approaches end of the array this statement amkes it so the for loop doesnt look at values do not exist to check for whether tasks need to be deferred
            lookaheadlength = lookaheadlength - 1;
        }

        for(var o = n+1; o < n + lookaheadlength; o++){ // Loops through new tasks array for number of tasks
            let elementvalue2 = inp.tasks.findIndex(element2 =>  element2.name === newtasksarray[o].name); // Finds index value in original input tasks array
            if( newtasksarray[o].period - newtasksarray[n].period < newtasksarray[o].worstCase){ //Task can't be deferred be deferred
                Defersum = Defersum + (inp.tasks[elementvalue2].worstCase / inp.tasks[elementvalue2].period) // Deferred value sum previos defer = WC/Period
            }
        }

        if (inp.frequencies.length == 0){ // If no specified frequency
            if (n >= 0 && n < inp.tasks.length){ // If statement for the first iteration of every task
                startTime = time; // startTime set to value of time
                Utilization = (newtasksarray[n].worstCase)/(newtasksarray[n].period - startTime) + Defersum; // Utilization = WC/(period - start time) + Any Deferral calculations
                Utilization = (Utilization>1)?(1):(Utilization); // cap utilization at 1
                frequency = Utilization; // Sets Frequency to calculated Utilization
                finishTime = startTime + newtasksarray[n].invocations/frequency; // Finish Time = start time + invocation/frequency
                duration = finishTime - startTime; // Duration = Finish time - Start time
                if (finishTime > newtasksarray[n].period){  // if Finish time surpasses period missed dealine variable is incremented
                    missedDeadline = 1;
                    finishtime = newtasksarray[n].period;
                }else{
                    missedDeadline = 0;
                }
                release = 0; // Release for first iteration of tasks is set to 0
            }else{ // After first iteration of every task
                if(time < newtasksarray[n - inp.tasks.length].period){ // current time is below release time of task start time set to release else it set to the current time
                    startTime = newtasksarray[n - inp.tasks.length].period;
                }else{
                    startTime = time;
                }
                Utilization = (newtasksarray[n].worstCase)/(newtasksarray[n].period - startTime) + Defersum; 
                Utilization = (Utilization>1)?(1):(Utilization); // cap utilization at 1
                frequency = Utilization;
                finishTime = startTime + newtasksarray[n].invocations/frequency;
                duration = finishTime - startTime;
                if (finishTime > newtasksarray[n].period){
                    missedDeadline = 1;
                    finishtime = newtasksarray[n].period;
                }else{
                    missedDeadline = 0;
                }
                release = newtasksarray[n].period - newtasksarray[elementvalue].period; // // Release is set period of current task - original period
            }
        }else{ // Else specified frequency
            if (n >= 0 && n < inp.tasks.length){
                startTime = time;
                Utilization = (newtasksarray[n].worstCase)/(newtasksarray[n].period - startTime) + Defersum;
                Utilization = (Utilization>1)?(1):(Utilization); // cap utilization at 1
                frequency = Utilization;
                for (var y = 0; y < inp.frequencies.length; y++){ // Determines smallest available frequency that is greater than the frequency value
                    if(frequenciesarray[y] >= frequency){
                        frequency = frequenciesarray[y];
                        break;
                    }else if(inp.frequencies.length == 1){
                        frequency = inp.frequencies[0]
                    }else{
                        frequency = frequency;
                    }
                }
                finishTime = startTime + newtasksarray[n].invocations/frequency;
                duration = finishTime - startTime;
                if (finishTime > newtasksarray[n].period){
                    missedDeadline = 1;
                    finishtime = newtasksarray[n].period;
                }else{
                    missedDeadline = 0;
                }
                release = 0;
            }else{
                if(time < newtasksarray[n - inp.tasks.length].period){
                    startTime = newtasksarray[n - inp.tasks.length].period;
                }else{
                    startTime = time;
                }
                Utilization = (newtasksarray[n].worstCase)/(newtasksarray[n].period - startTime) + Defersum;
                Utilization = (Utilization>1)?(1):(Utilization); // cap utilization at 1
                frequency = Utilization;
                for (var y = 0; y < inp.frequencies.length; y++){
                    if(frequenciesarray[y] >= frequency){
                        frequency = frequenciesarray[y];
                        break;
                    }else if(inp.frequencies.length == 1){
                        frequency = inp.frequencies[0]
                    }else{
                        frequency = frequency;
                    }
                }
                finishTime = startTime + newtasksarray[n].invocations/frequency;
                duration = finishTime - startTime;
                if (finishTime > newtasksarray[n].period){
                    missedDeadline = 1;
                    finishtime = newtasksarray[n].period;
                }else{
                    missedDeadline = 0;
                }
                release = newtasksarray[n].period - newtasksarray[elementvalue].period;
            }
        }
        
        time = finishTime; // Time is set to finish time of current task

        // All determined values are appendeed to the output array
        output.tasks[elementvalue].releases.push(release); 
        output.tasks[elementvalue].startTimes.push(startTime);
        output.tasks[elementvalue].durations.push(duration);
        output.tasks[elementvalue].frequencies.push(frequency);

        if (missedDeadline == 1){ // If Missed Deadline is set to 1 missed deadline time is appened to output array
            output.tasks[elementvalue].missedDeadlines.push(newtasksarray[n].period);
        }

    }

    //Console Logs to Check Values and Debug
    //console.log(output.simulationTime);
    //console.log(output.tasks);
    //console.log(output.frequencies);

    // add final deadline to each task
    for (var i=0; i<output.tasks.length; i++) {
      var time = output.tasks[i].releases[output.tasks[i].releases.length-1] + inp.tasks[i].period;
      output.tasks[i].releases.push(time);
    }

    return output; // Output is returned
}

//Function used for sorting objects within an array based on period
//USED IN LOOK AHEAD FUNCTION!!!!
function compare(a, b) { 
    if ( a.period <= b.period ){
      return -1;
    }
    if ( a.period > b.period ){
      return 1;
    }
    return 0;
}

/*
TAKES ALGORITHM OUTPUT DATA AND BUILDS SIMULATION GRAPH AND DISPLAYS IT TO USER IN DIV WITH ID='outputGraph'
^updated to use input as object, with frequency info included in tasks
^not used anymore, but would work for non Energy Aware Algorithms
*/
const drawGraph = function (input) {
  // disect input
  var simulationTime = input.simulationTime;
  var tasks = input.tasks;
  // construct trace for each task (put all into data object)
  var data = [];
  for (var t = 0; t < tasks.length; t++) {
    // convert startTimes to midpoints
    var midpoints = [];
    for (var i = 0; i < tasks[t].startTimes.length; i++) {
      var midpoint = tasks[t].startTimes[i] + (0.5 * tasks[t].durations[i]);
      midpoints.push(midpoint);
    }

    // create array of y values
    var frequencies = [];
    for (var i = 0; i < tasks[t].startTimes.length; i++) {
      frequencies.push(tasks[t].frequencies[i]);
    }

    // create trace object
    var trace = {
      type: 'bar',
      x: midpoints,
      y: frequencies,
      width: tasks[t].durations,
      yaxis: ((t == 0) ? 'y' : 'y' + (t + 1))
    }

    // add trace to data
    data.push(trace);
  }

  // initialize layout for graph
  var layout = {
    xaxis: { range: [0, simulationTime] },
    showlegend: false,
    annotations: [],
  }

  // create yaxis for each task
  var numTasks = tasks.length;
  var numGaps = numTasks - 1;
  var gap = 0.05;
  var totalContent = 1 - gap * numGaps;
  var content = totalContent / numTasks;
  var currentPosition = 0;

  for (var t = 0; t < tasks.length; t++) {
    // determine axis name
    var propertyName = (t == 0) ? 'yaxis' : 'yaxis' + (t + 1);
    var yaxis = {
      domain: [currentPosition, currentPosition + content],
      title: tasks[t].name
    }
    // add axis to layout object
    layout[[propertyName]] = yaxis;
    // update currentPosition
    currentPosition += content + gap;
  }

  // add annotations for each release
  for (var t = 0; t < tasks.length; t++) {
    for (var r = 0; r < tasks[t].releases.length; r++) {
      // create annotation
      var annotation = {
        x: tasks[t].releases[r],
        y: 0,
        xref: 'x',
        yref: 'y' + (t + 1),
        showarrow: true,
        arrowhead: 2,
        ax: 0,
        ay: -50
      }
      // add annotation 
      layout.annotations.push(annotation);
    }
  }

  // create graph
  Plotly.newPlot('outputGraph', data, layout, { staticPlot: true });

}

/*
DRAW GRAPH 
takes output from algorithm and builds the graph in the HTML DOM
output = {simulationTime, tasks, frequencies} = object
where new attributes are added to each task:
releases, startTimes, durations, frequencies, missedDeadlines
each is an array of numbers representing each time the task runs
missedDeadlines holds the times of releases that are missed
*/
const drawGraph2 = function (input) {
  // assign each task a colour
  for (var i = 0; i < input.tasks.length; i++) {
    // switch between 4 colours
    switch (i % 4) {
      case 0: input.tasks[i].color = 'rgba(255,75,75,1)'; break;
      case 1: input.tasks[i].color = 'rgba(50,100,255,1)'; break;
      case 2: input.tasks[i].color = 'rgba(50, 255, 50,1)'; break;
      case 3: input.tasks[i].color = 'rgba(255,255,50,1)';
    }
  }

  // loop through tasks
  for (var t = 0; t < input.tasks.length; t++) {
    // initialize new midpoints attribute
    input.tasks[t].midpoints = [];
    // loop through startTimes/durations
    for (var s = 0; s < input.tasks[t].startTimes.length; s++) {
      // calculate midpoint 
      var midpoint = input.tasks[t].startTimes[s] + (input.tasks[t].durations[s] / 2);
      // add midpoint to list for task
      input.tasks[t].midpoints.push(midpoint);
    }
  }

  // loop through tasks
  for (var t = 0; t < input.tasks.length; t++) {
    // initialize new endTimes attribute
    input.tasks[t].endTimes = [];
    // loop through startTimes/durations
    for (var s = 0; s < input.tasks[t].startTimes.length; s++) {
      // calculate endTime 
      var endTime = input.tasks[t].startTimes[s] + (input.tasks[t].durations[s]);
      // add endTime to list for task
      input.tasks[t].endTimes.push(endTime);
    }
  }

  // initialize data
  var data = [];

  // initialize trace
  var trace = {
    type: 'bar',
    x: [], // midpoints
    y: [], // frequencies
    width: [], // durations
    text: [],
    textposition: 'auto',
    marker: {
      color: [],
      opacity: 0.6,
      line: {
        color: [],
        width: 1.5
      }
    }, // task colors
    yaxis: 'y'
  }

  // loop through tasks
  for (var t = 0; t < input.tasks.length; t++) {
    // loop through midpoints
    for (var m = 0; m < input.tasks[t].midpoints.length; m++) {
      // push midpoint onto trace
      trace.x.push(input.tasks[t].midpoints[m]);
      // push frequency onto trace
      trace.y.push(input.tasks[t].frequencies[m]);
      // label bar with frequency value
      trace.text.push(Math.round( input.tasks[t].frequencies[m] * 100) / 100);
      // push duration onto trace
      trace.width.push(input.tasks[t].durations[m]);
      // push colour to trace
      trace.marker.color.push(input.tasks[t].color);
      trace.marker.line.color.push(input.tasks[t].color);
    }
  }

  // add trace to data
  data.push(trace);

  // initialize layout for graph
  var layout = {
    xaxis: {
      range: [0, input.simulationTime],
      title: 'Time',
      tickvals: [0, input.simulationTime],
    },
    yaxis: {
      range: [0, 1],
      title: 'Frequencies',
      tickvals: [0.5, 1],
    },
    showlegend: false,
    annotations: [],
  }

  // loop through tasks
  for (var t = 0; t < input.tasks.length; t++) {
    // loop through startTimes/endTimes
    for (var s = 0; s < input.tasks[t].startTimes.length && s < input.tasks[t].endTimes.length; s++) {
      // add startTime to xaxis ticks
      var num = Math.round(input.tasks[t].startTimes[s] * 100) / 100;
      layout.xaxis.tickvals.push(num);
      // add endTime to xaxis ticks
      var num = Math.round(input.tasks[t].endTimes[s] * 100) / 100;
      layout.xaxis.tickvals.push(num);
    }
    // loop through releases
    for (var r = 0; r < input.tasks[t].releases.length; r++) {
      // add release to xaxis ticks
      var num = Math.round(input.tasks[t].releases[r] * 100) / 100;
      layout.xaxis.tickvals.push(num);
    }
    // loop through frequencies
    for (var f=0; f<input.tasks[t].frequencies.length; f++) {
      // add frequency to yaxis ticks
      // layout.yaxis.tickvals.push(input.tasks[t].frequencies[f]);
    }
  }

  // loop through frequencies
  for (var f=0; f<input.frequencies.length; f++) {
      // add frequency to yaxis ticks
      var num = Math.round(input.frequencies[f] * 100) / 100;
      layout.yaxis.tickvals.push(num);
  }

  // loop through tasks
  for (var t = 0; t < input.tasks.length; t++) {
    // loop through releases
    for (var r = 0; r < input.tasks[t].releases.length; r++) {
      // check if missed deadline
      var missed = false; // initialize to not missed
      for (var m = 0; m < input.tasks[t].missedDeadlines.length; m++) { // loop through missedDeadlines
        if (input.tasks[t].releases[r] == input.tasks[t].missedDeadlines[m]) {
          // missedDeadline matches release time -> missed
          missed = true;
          break;
        }
      }

      // check if annotation at this time already
      var exists = false;
      for (var a = 0; a < layout.annotations.length; a++) {
        if (layout.annotations[a].x == input.tasks[t].releases[r]) {
          exists = true;
          // add text to existing annotation
          layout.annotations[a].text = layout.annotations[a].text + ', ' + input.tasks[t].name;
          break;
        }
      }

      // create new annotation in new spot
      if (exists == false) {
        // create annotation
        var annotation = {
          x: input.tasks[t].releases[r],
          y: 0,
          xref: 'x',
          yref: 'y',
          showarrow: true,
          arrowhead: 2,
          ax: 0,
          ay: -50,
          text: input.tasks[t].name
        }
        if (missed) {
          annotation['arrowcolor'] = 'rgba(255,0,0,1)';
        }

        // add annotation to list
        layout.annotations.push(annotation);
      }
    }
  }

  // create graph
  Plotly.newPlot('outputGraph', data, layout, { staticPlot: true });

}

/* 
DISPLAY GRAPH INFO IN LIST FORM
output = {simulationTime, tasks, frequencies} = object
where new attributes are added to each task:
releases, startTimes, durations, frequencies, missedDeadlines
*/
const displayOutputList = function (input) {
  // grab tasks from input
  var tasks = input.tasks;

  // initialize list to hold each running task
  var runs = [];

  // find all times cpu is used
  for (var t=0; t<tasks.length; t++) {
    for (var s=0; s<tasks[t].startTimes.length; s++) {
      // create run element
      var run = {
        name: tasks[t].name,
        start: tasks[t].startTimes[s],
        frequency: tasks[t].frequencies[s],
        duration: tasks[t].durations[s],
        end: tasks[t].startTimes[s] + tasks[t].durations[s]
      }
      // add to list
      runs.push(run);
    }
  }

  // sort runs
  runs.sort(function(a, b){return a.start - b.start});

  // get output table
  var table = document.getElementById('outputList');

  // empty table (leave first row)
  while (table.childElementCount > 1) {
    table.removeChild(table.lastElementChild);
  }

  // fill table with runs
  for (var r=0; r<runs.length; r++) {
    // create row
    var row = document.createElement('tr');
    // create cells and append to row
    var cell = document.createElement('td');
    cell.innerHTML = runs[r].name;
    row.appendChild(cell);
    var cell = document.createElement('td');
    cell.innerHTML = Math.round( runs[r].frequency * 100) / 100;
    row.appendChild(cell);
    var cell = document.createElement('td');
    cell.innerHTML = Math.round( runs[r].start * 100) / 100;
    row.appendChild(cell);
    var cell = document.createElement('td');
    cell.innerHTML = Math.round( runs[r].duration * 100) / 100;
    row.appendChild(cell);
    var cell = document.createElement('td');
    cell.innerHTML = Math.round( runs[r].end * 100) / 100;
    row.appendChild(cell);
    // append row to table
    table.appendChild(row);
  }

  // initialize list to hold missed deadline info
  var missed = [];

  // find all missed deadlines
  for (var t=0; t<tasks.length; t++) {
    for (var m=0; m<tasks[t].missedDeadlines.length; m++) {
      // create missed element
      var mdl = {
        name: tasks[t].name,
        time: Math.round( tasks[t].missedDeadlines[m]* 100) / 100
      }
      // add to list
      missed.push(mdl);
    }
  }

  // sort missed deadlines
  missed.sort(function(a, b){return a.time - b.time});

  // get output table
  var table = document.getElementById('missedDeadlineList');

  // empty table (leave first row)
  while (table.childElementCount > 1) {
    table.removeChild(table.lastElementChild);
  }

  // fill table with missed deadline info
  for (var m=0; m<missed.length; m++) {
    // create row
    var row = document.createElement('tr');
    // create cell for name
    var cell = document.createElement('td');
    cell.innerHTML = missed[m].name;
    // append cell to row
    row.appendChild(cell);
    // create cell for time
    var cell = document.createElement('td');
    cell.innerHTML = Math.round( missed[m].time * 100) / 100;
    // append cell to row
    row.appendChild(cell);
    // append row to table
    table.appendChild(row);
  }
}

