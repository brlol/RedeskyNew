/// api_version=2
var script = registerScript({
    name: "TimerLongJump",
    version: "1.0",
    authors: ["br"]
});

var ticks = 0;
var currentTimer = 1;

script.registerModule({
    name: "TimerLongJump",
    category: "Misc",
    description: "pray to omikron",
    settings: {
        startTimer: Setting.float({
            name: "StartTimer",
            min: 0.1,
            max: 10,
            default: 1.85
        }),
        endTimer: Setting.float({
            name: "EndTimer",
            min: 0.1,
            max: 10,
            default: 1.0
        }),
        speed: Setting.integer({
            name: "Speed",
            min: 1,
            max: 20,
            default: 1
        }),
        delay: Setting.integer({
            name: "Delay",
            min: 1,
            max: 20,
            default: 3
        })
    }
}, function(TimerLongJump) {
    TimerLongJump.on("enable", function() {
        currentTimer = TimerLongJump.settings.startTimer.get();
        ticks = 0;
        mc.thePlayer.motionY = 0.09;
    });
    TimerLongJump.on("update", function() {
        ticks++;
        mc.timer.timerSpeed = currentTimer;
        if (currentTimer > TimerLongJump.settings.endTimer.get() && ticks == TimerLongJump.settings.delay.get()) {
            currentTimer -= 0.05 * TimerLongJump.settings.speed.get()
            ticks = 0;
        }
    });
    TimerLongJump.on("disable", function() {
        mc.timer.timerSpeed = 1;
    });
});