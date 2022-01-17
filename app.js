// this variable grabs todays day/date/year/time and displays it to the html
var today = moment();
$('#currentDay').text(today.format('llll'))

// grabs the current time but only the Hour, and gets parsed into an object
var now = parseInt(moment().format('H'));
// initialize object
var workDayObj = {}
// adds the input value to the current time and updates page
$('#changeBtn').click(function(e){
    e.preventDefault()
    var time = parseInt($('#change-time').val())
    console.log(time);
    now = now + time
    init()
})


// runs the operation that sets the work data
function init(){
    // used ternary operators to check if local storage has data,
    // else sets it as empty object
    workDayObj = localStorage.getItem('work-day-data') ? JSON.parse(localStorage.getItem('work-day-data')) : {}
    
    const timeblockChildren = $('#time-blocks')[0].children;
    // loop to get every time-block with "if" statement to switch colors
    // depending on condition
    for(var i = 0; i < timeblockChildren.length; i++){
        
        var currentTimeBlock = timeblockChildren[i].children[1];
        console.log(timeblockChildren[i]);
        var currentTime = parseInt(currentTimeBlock.dataset.time);
        currentTimeBlock.value = workDayObj[currentTime] ? workDayObj[currentTime] : '';
        if(currentTime < now){
            currentTimeBlock.classList.remove('present')
            currentTimeBlock.classList.remove('future')
            currentTimeBlock.classList.add('past')

        } else if(currentTime === now){
            currentTimeBlock.classList.remove('past')
            currentTimeBlock.classList.remove('future')
            currentTimeBlock.classList.add('present')
        } else if(currentTime > now){
            currentTimeBlock.classList.remove('past')
            currentTimeBlock.classList.remove('present')
            currentTimeBlock.classList.add('future')
        }
        timeblockChildren[i].children[2].addEventListener('click', function(e){
            e.preventDefault()
            var blockTextArea = this.parentNode.children[1]
            var blockTime = parseInt(blockTextArea.dataset.time)
            var blockText = blockTextArea.value
            saveData(blockTime, blockText)
        })
    }
    // saves to local storage as a string
    function saveData(time, text){

        workDayObj[time] = text;
        

        localStorage.setItem('work-day-data', JSON.stringify(workDayObj))
        
        
        
    }
}

init()

