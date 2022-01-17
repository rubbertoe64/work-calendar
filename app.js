var today = moment();
$('#currentDay').text(today.format('llll'))

var now = parseInt(moment().format('H'));

var workDayObj = {}

$('#changeBtn').click(function(e){
    e.preventDefault()
    var time = parseInt($('#change-time').val())
    console.log(time);
    now = now + time
    init()
})

// console.log('now',now);

function init(){
    workDayObj = localStorage.getItem('work-day-data') ? JSON.parse(localStorage.getItem('work-day-data')) : {}
    console.log(workDayObj);
    const timeblockChildren = $('#time-blocks')[0].children;
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
    function saveData(time, text){

        workDayObj[time] = text;
        console.log(workDayObj);

        localStorage.setItem('work-day-data', JSON.stringify(workDayObj))
        
        
        
    }
}

init()

