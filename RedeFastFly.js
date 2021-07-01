/// api_version=2
var script = registerScript({
    name: "RedeFastFly",
    version: "1.0",
    authors: ["br"]
});

var ticks = 0;
var currentTimer = 1;

script.registerModule({
    name: "RedeFastFly",
    category: "Misc",
    description: "A timer for xd oof's long jump.",
    settings: {
        startTimer: Setting.float({
            name: "StartTimer",
            min: 1,
            max: 10,
            default: 5.3
        }),
        endTimer: Setting.float({
            name: "EndTimer",
            min: 0.1,
            max: 1,
            default: 0.5
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
}, function(RedeFastFly) {
    RedeFastFly.on("enable", function() {
        currentTimer = RedeFastFly.settings.startTimer.get();
        ticks = 0;
        mc.thePlayer.motionY = 0.09;
    });
    RedeFastFly.on("update", function() {
        ticks++;
        mc.timer.timerSpeed = currentTimer;
        if (currentTimer > RedeFastFly.settings.endTimer.get() && ticks == RedeFastFly.settings.delay.get()) {
            currentTimer -= 0.05 * RedeFastFly.settings.speed.get()
            ticks = 0;
        }
    });
    RedeFastFly.on("disable", function() {
        mc.timer.timerSpeed = 1;
    });
});