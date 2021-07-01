/// api_version=2
var script = registerScript({
    name: "RedeConfigLoader",
    version: "2.0",
    authors: ["FaaatPotato, liulihaocai, br"]
});

//Credits: Thanks to liulihaocai and FaaatPotato :D

var C03 = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var C04 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var TitsBest = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook");
var HentaiPacket = Java.type("net.minecraft.network.play.server.S02PacketChat");
var Amanee = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');
var BlockPos = Java.type('net.minecraft.util.BlockPos');
var thePlayer = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils");
var Block = Java.type('net.minecraft.block.Block');
var S08 = Java.type('net.minecraft.network.play.server.S08PacketPlayerPosLook');
var RotationUtils = Java.type('net.ccbluex.liquidbounce.utils.RotationUtils');
var Rotation = Java.type('net.ccbluex.liquidbounce.utils.Rotation');
var DCT = Java.type("net.minecraft.network.login.server.S00PacketDisconnect");
var Regen = Java.type("net.minecraft.network.play.server.S06PacketUpdateHealth");

var FreeCam = moduleManager.getModule("FreeCam");
var Fly = moduleManager.getModule("Fly");
var Teleport = moduleManager.getModule("Teleport");
var Spammer = moduleManager.getModule("Spammer");

function vClip(d) {
	   mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + d, mc.thePlayer.posZ);
	}

function setTimeout(func, milliseconds) {
    var timer = new Timer("setTimeout", true);
    timer.schedule(function () {
        func();
    }, milliseconds);

    return timer;
}

Math.rad = function(deg) {
    return deg * Math.PI / 180;
}

function r(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function setYeet(_yeet) {
	var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
	mc.thePlayer.motionX = _yeet * -Math.sin(playerYaw);
	mc.thePlayer.motionZ = _yeet * Math.cos(playerYaw);
}

script.registerModule({
    name: "RedeManager",
    description: "Is config loader and stuff",
    category: "Fun",
    tag: "JS",
    settings: {
        B73: Setting.boolean({
            name: "LoadRedeskyNewv7",
            default: false
		}),
        B72: Setting.boolean({
            name: "LoadRedeskyNewv6",
            default: false
		}),
    }

}, function (module) {
    module.on("enable", function () {
    });
    module.on("disable", function () {
    module.setState(true);
    });
    module.on("update", function () {
    if (module.settings.B73.get()) {
    commandManager.executeCommands(".config load https://raw.githubusercontent.com/br-22448/RedeskyNew/Configs/redeskynewv7");
    module.settings.B73.set(false);
    
	setTimeout(function () {
	Chat.print("§8§l[§c§lJM§8§l]§7 Make sure you use all needed Modules!");	
	Chat.print("§8§l[§c§lJM§8§l]§7 List of them can be found in configs channel!");
	},3000);
    }
    
    if (module.settings.B72.get()) {
    commandManager.executeCommands(".config load https://raw.githubusercontent.com/br-22448/RedeskyNew/Configs/redeskynewv6");
    module.settings.B72.set(false);
        
    setTimeout(function () {
    Chat.print("§8§l[§c§lJM§8§l]§7 Make sure you use all needed Modules!");	
    Chat.print("§8§l[§c§lJM§8§l]§7 List of them can be found in configs channel!");
    },3000);
    }
    });
    
    script.on("load", function() {
    module.setState(true);
    });
});

script.registerModule({
    name: "TimerLongJump",
    category: "Misc",
    description: "A timer for br's long jump.",
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

script.registerModule({
	name: "RedeFly",
	description: "fly!",
    category: "Movement",
    settings: {
        airSpeed: Setting.float({
            name: "AirSpeed",
            default: 0.11,
            min: 0.05,
            max: 0.25
        }),
        asMin: Setting.float({
            name: "MinAirSpeed",
            default: 0.04,
            min: 0.05,
            max: 0.25
        }),
        asRe: Setting.float({
            name: "ReduceAirSpeed",
            default: 0.04,
            min: 0.00,
            max: 0.20
        }),
		asr: Setting.boolean({
			name: "AirSpeedReducer",
			default: false
		}),
        ymotV: Setting.float({
            name: "YMotion",
            default: 0.65,
            min: 0.00,
            max: 0.65
        }),
        ymotM: Setting.float({
            name: "MinYMotion",
            default: 0.45,
            min: 0.00,
            max: 0.45
        }),
        ymotR: Setting.float({
            name: "ReduceYMotion",
            default: 0.04,
            min: 0.00,
            max: 0.30
        }),
		ymot: Setting.boolean({
			name: "YMotionReducer",
			default: false
		})
	}
}, function (module) {
    var airTicks=0;
    module.on("enable", function () {
        airTicks=0;
    })
	
    module.on("update", function () {
        //as reduce
        if(module.settings.asr.get()){
            var as=module.settings.airSpeed.get()-(airTicks*(module.settings.asRe.get()/100));
            mc.thePlayer.speedInAir = as<module.settings.asMin.get()?module.settings.asMin.get():as;
        }else{
            mc.thePlayer.speedInAir = module.settings.airSpeed.get();
        }
        //fly
        if (mc.thePlayer.onGround){
            airTicks=0;
            mc.thePlayer.jump()
        }else{
            if(module.settings.ymot.get()){
                var motY=module.settings.ymotV.get()-(airTicks*(module.settings.ymotR.get()/100));
                airTicks++;
                mc.thePlayer.motionY += motY<module.settings.ymotM.get()?module.settings.ymotM.get():motY;
            }else{
                mc.thePlayer.motionY += 0.08;
            }
        }
    })
    
    module.on("disable",function () {
        mc.thePlayer.speedInAir = 0.02
    })
})


script.registerModule({
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
            min: 5.3,
            max: 5.3,
            default: 5.3
        }),
        endTimer: Setting.float({
            name: "EndTimer",
            min: 0.5,
            max: 0.5,
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

