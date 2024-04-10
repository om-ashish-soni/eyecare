let isActivated = true;
let intervalId;
let isSpeechMode = true;
const reminderTime=20*60*1000;//20 minutes
// const reminderTime = 20 * 1000;//20 seconds
const message='Time to relax your eyes, Watch 20 feet away for 20 seconds';
const ProjectName='Netra Care'
const welcomeMessage=`Welcome to ${ProjectName} , the twenty twenty twenty rule for eye care from screen time, this will notify you on every 20 minutes to watch 20 feet away for 20 seconds`;


function speak(messageToSpeak){
    if(isSpeechMode){
        let speech = new SpeechSynthesisUtterance();
        console.log("in speech mode");
        speech.text = messageToSpeak;
        speech.volume = 1;
        speech.rate = 0.75;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
    }
}
function activate() {
    console.log("Activating....",reminderTime);
    isActivated = true;
    document.getElementById('status').textContent = 'Activated';
    startReminder();
}

function deactivate() {
    if (isActivated) {
        console.log("Deactivating....",reminderTime);
        isActivated = false;
        document.getElementById('status').textContent = 'Deactivated';
        clearInterval(intervalId);
    }
}

function startReminder() {
    console.log("Starting reminder....",reminderTime);
    clearInterval(intervalId);
    remind(welcomeMessage)
    speak('This is your first demo')
    remind()
    intervalId = setInterval(() => {
        console.log("reminder happened now")
        remind();
    }, reminderTime); // 20 minutes in milliseconds
}

function remind(messageToRemind=message) {
    if (isActivated) {
        console.log("in remind")
        
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let timeString = hours + ':' + minutes + ' ' + ampm;

        // Notification
        if (Notification.permission === 'granted') {
            console.log("going to notify")
            new Notification(`${messageToRemind}`, {
                body: `It's ${timeString}. Take a break and follow the 20-20-20 rule for your eyes.`,
                icon: 'eye-icon.png' // You can use an icon image for the notification
            });
        } else {
            console.log("going to notify for request permission")
            Notification.requestPermission().then(function (permission) {
                if (permission === 'granted') {
                    new Notification(`Time to rest your eyes!`, {
                        body: `It's ${timeString}. Take a break and follow the 20-20-20 rule for your eyes.`,
                        icon: 'eye-icon.png' // You can use an icon image for the notification
                    });
                }
            });
        }

        speak(messageToRemind)
    }
}


function toggleSpeechMode() {
    isSpeechMode = !isSpeechMode;
    document.getElementById('speechMode').textContent = isSpeechMode ? 'On' : 'Off';
}

// Start reminder automatically when the page loads

const setupReminder=()=>{
    console.log("on dom loaded calling activate")
    activate();
    console.log("removing")
    document.removeEventListener('DOMContentLoaded', setupReminder);
}

setupReminder()