/// api_version=2
var script = registerScript({
	name: "RedeFly",
	version: "1.0",
	authors: ["liulihaocai"]
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
            default: 0.08,
            min: 0.00,
            max: 0.20
        }),
        ymotM: Setting.float({
            name: "MinYMotion",
            default: 0.04,
            min: 0.00,
            max: 0.20
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
