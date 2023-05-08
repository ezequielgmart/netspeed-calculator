// "https://source.unsplash.com/random?topics=nature"
let startTime, endTime;
let imageSize =""
let image = new Image()
let result = document.getElementById('result')
let form = document.getElementById('mainForm')
// Gets a random image 
let imageLink = "https://source.unsplash.com/random?topics=nature"

var kbsPerSecond = 0
// when image loads 
image.onload = async function () {
    endTime = new Date().getTime();
  
    //Get image size
    await fetch(imageLink).then((response) => {
      imageSize = response.headers.get("content-length");
      calculateSpeed();
    });
  };

function getKbsPerSecond(speedInKbps) {
    return ((speedInKbps/8)).toFixed(2)
}

function converTimeFrame(timeFrameInMinutes) {
    // verificar que el tiempo en minutos sea mayor a una hora (60 minuts)
    if (timeFrameInMinutes > 60) {
        
        // si es mayor dividir cuantas horas tiene 
        let howManyMinutes = timeFrameInMinutes/60

        if (howManyMinutes >= 24) {
            return  (howManyMinutes/24).toFixed(0) + " Day(s)"
        } else {
            return (howManyMinutes).toFixed(2) + " Hour(s)"
        }

    }else {
        return timeFrameInMinutes + " Min(s)"
    }
    
}
function getTimeFrame(downloadSize,kbsPerSecond) {

    // tomamos el tamaño del archivo en gb y lo multiplicamos por me
    let downloadSizeInGbs = (downloadSize*1024)*1024
     let timeFrameInMinutes = ((downloadSizeInGbs/kbsPerSecond)/60).toFixed(2)
     return converTimeFrame(timeFrameInMinutes)

}



function getSpeedinMbs(speedInMbps){
    let speedInKbps;
    return speedInKbps = (speedInMbps / 1024).toFixed(2)
}

function getSpeedInKbps(speedInBps){
    let speedInKbps;
    return speedInKbps = (speedInBps / 1024).toFixed(2)
}

function convertMbpsTokbsPerSecond(speedInMbps) {
    let kbsPerSecond = (speedInMbps*0.125) * 1000

   return kbsPerSecond
}
function calculateSpeedSelected(speedInMbps){

    let downloadSize = document.getElementById('gbTxt').value
    
    // to convert mbps to mbs we multiply megabit * 0.125
    let kbsPerSecond = convertMbpsTokbsPerSecond(speedInMbps)
    let timeFrame = getTimeFrame(downloadSize,kbsPerSecond)

    renderCalculation(speedInMbps,downloadSize,kbsPerSecond,timeFrame,result) 
    
}

// function to calculate the speed
function calculateSpeed(){
    let timeDuration = (endTime - startTime) / 1000

    let loadedBits = imageSize * 8
    let speedInBps = (loadedBits / timeDuration).toFixed(2)
    let speedInKbps = getSpeedInKbps(speedInBps)
    let speedInMbps =  (speedInKbps / 1024).toFixed(2)

    let kbsPerSecond = getKbsPerSecond(speedInKbps)

    let downloadSize = document.getElementById('gbTxt').value

    let timeFrame = getTimeFrame(downloadSize,kbsPerSecond)

    
  renderCalculation(speedInMbps,downloadSize,kbsPerSecond,timeFrame,result)

}
console.log(result.childElementCount)
// Initial
const calculateNoSpeedSelected = async () =>{
   startTime = new Date().getTime()
   image.src = imageLink;
};

function renderCalculation(speedInMbps,downloadSize,kbsPerSecond,timeFrame,result) {
    result.innerHTML += `
    <div>
        <p>Your current speed: ${speedInMbps} Mbps </p>
        <p>File size: ${downloadSize} GB </p>
        <p>Kilobytes per Second: <span id="kbsPersecondSpan">${kbsPerSecond}</span> Kbs</p>
        <p>Estimated time: ${timeFrame}</p>

    </div>`

}

function mainFunction(result,speedInMbpsTxt) {
    // If the speed wasn't selected 

    if (speedInMbpsTxt=="") {

        if (result.childElementCount>0) {

            result.removeChild(result.children[0]);

            calculateNoSpeedSelected()

        } else {

            calculateNoSpeedSelected()
                
        }


    } else {

        if (result.childElementCount>0) {
            result.removeChild(result.children[0]);

            calculateSpeedSelected(speedInMbpsTxt)

        } else {

            calculateSpeedSelected(speedInMbpsTxt)
                
        }

    }
}


form.addEventListener('submit',(e)=>{
    e.preventDefault()
    let speedInMbpsTxt = document.getElementById('speedInMbpsTxt').value
    let fileSize = document.getElementById('gbTxt').value

    // if the file size is less than 0
    if (fileSize<=0) {

        alert("File size must be greater than 0")

    } else {

        
        mainFunction(result,speedInMbpsTxt)

    }


    
 
    
})




