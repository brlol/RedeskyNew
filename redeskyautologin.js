var scriptName = "redeskyautologin"
var scriptVersion = 2.0
var scriptAuthor = "br"


var Title = new Title()
var client;
var S45PacketTitle = Java.type('net.minecraft.network.play.server.S45PacketTitle');
var S2FPacketSetSlot = Java.type('net.minecraft.network.play.server.S2FPacketSetSlot');
var C0EPacketClickWindow = Java.type('net.minecraft.network.play.client.C0EPacketClickWindow');
var C01PacketChatMessage = Java.type('net.minecraft.network.play.client.C01PacketChatMessage');

var authenticated = false;
var password = "hackme";

function Title() {

    this.getName = function() {
        return "redeskyautologin"
    }

    this.getDescription = function() {
        return "Redesky Captcha Solver/Auto Login"
    }

    this.getCategory = function() {
        return "Fun"
    }

    this.onUpdate = function() {
        if (mc.thePlayer.ticksExisted < 2) authenticated = false
    }
    this.onPacket = function(e) {
        if (e.getPacket() instanceof S45PacketTitle && !authenticated) {
            if (e.getPacket().getMessage().getFormattedText().match(/\/register/)) {
                mc.thePlayer.sendQueue.addToSendQueue(new C01PacketChatMessage("/register " + password + " " + password));
                authenticated = true;
                if (mc.getCurrentServerData().serverIP.match(/^2187ge/))
                    chat.print("§4You're ready to play!")
            } else if (e.getPacket().getMessage().getFormattedText().match(/\/login/)) {
                mc.thePlayer.sendQueue.addToSendQueue(new C01PacketChatMessage("/login " + password));
                authenticated = true;
                if (mc.getCurrentServerData().serverIP.match(/^2187ge/))
                    chat.print("§4You're ready to play!")
            }
        } else if (e.getPacket() instanceof S2FPacketSetSlot) {
            if (e.getPacket().func_149174_e().getDisplayName().match(/Clique aqui/)) {
                mc.thePlayer.sendQueue.addToSendQueue(new C0EPacketClickWindow(e.getPacket().func_149175_c(), e.getPacket().func_149173_d(), 0, 0, e.getPacket().func_149174_e(), 31337));
            }
        }
    }
}

function onEnable() {
    client = moduleManager.registerModule(Title)
}

function onDisable() {
    moduleManager.unregisterModule(client)
}