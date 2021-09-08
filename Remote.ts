enum RemoteButton {
    //% block=A
    A = 0x45,
    //% block=B
    B = 0x46,
    //% block=C
    C = 0x47,
    //% block=D
    D = 0x44,
    //% block=+
    Add = 0x43,
    //% block=-
    Sub = 0x0d,
	
    //% block=UP
    UP = 0x40,
    //% block=LEFT
    Left = 0x07,
    //% block=OK
    Ok = 0x15,
    //% block=RIGHT
    Right = 0x09,
    //% block=DOWN
    Down = 0x19,
    //% block=0
    NUM0 = 0x16,
    //% block=1
    NUM1 = 0x0c,
    //% block=2
    NUM2 = 0x18,
    //% block=3
    NUM3 = 0x5e,
    //% block=4
    NUM4 = 0x08,
    //% block=5
    NUM5 = 0x1c,
    //% block=6
    NUM6 = 0x5a,
    //% block=7
    NUM7 = 0x42,
    //% block=8
    NUM8 = 0x52,
    //% block=9
    NUM9 = 0x4a
};
 enum  IrPins{

     P0=  3,
     P1=  2,
     P2=  1,
     P3=  4,
     P4=  5,
     P5=  17,
     P6=  12,
     P7=  11,
     P8=  18,
     P9=  10,
     P10= 6,
     P11= 26,
     P12= 20,
     P13= 23,
     P14= 22,
     P15= 21,
     P16= 16,
     P19= 0,
     P20= 30
   };

//% color="#EE6A50" weight=10 icon="\uf013"
namespace Remote {
    /**
     * button pushed.
     */
    //% blockId=onPressEvent
    //% block="When the infrared remote control button|%btn|is pressed" shim=IrRemote::onPressEvent group="micro:bit(v1)"
    export function OnPressEvent(btn: RemoteButton, body: () => void): void {
        return;
    }

    /**
     * initialises local variables
     *  @param pin describe parameter here, eg: IrPins.P5  
     */
    //% blockId=IrRemote_init 
    //% block="Infrared remote control initialization pin|%pin" shim=IrRemote::IrRemote_init group="micro:bit(v1)"
    export function IrRemote_init(pin: IrPins): void {
        return;
    }
    
    
    
    
    
export class Packeta {
    public mye: string;
    public myparam: number;
}


let irstate:string;
let state:number;
 /**
 * Read IR sensor value V2.
 */

//% advanced=true shim=maqueenIRV2::irCode
function irCode(): number {
    return 0;
}

//% weight=5
//% group="micro:bit(v2)"
//% blockId=IR_readv2 block="Infrared reception value"
export function IR_readV2(): string {
    pins.setPull(DigitalPin.P1, PinPullMode.PullUp);
    let val = valuotokeyConversion();
    return val;
}

//% weight=2
//% group="micro:bit(v2)"
//% blockId=IR_callbackUserv2 block="Run when infrared is received"
//% draggableParameters
export function IR_callbackUserV2(cb: (message: string) => void) {
    pins.setPull(DigitalPin.P1, PinPullMode.PullUp);
    state = 1;
    control.onEvent(11, 22, function() {
        cb(irstate)
    }) 
}

function valuotokeyConversion(): string {
    // let irdata: number;
	let str: string;
    // basic.showString("" + (irCode()))
    switch (irCode()) {
        case 0xe916: str = '*'; break;
        case 0xf20d: str = '#'; break;
        case 0xe718: str = 'UP'; break;
        case 0xf708: str = 'LEFT'; break;
        case 0xe31c: str = 'OK'; break;
        case 0xA55A: str = 'RIGHT'; break;
        case 0xe619: str = '0'; break;
        case 0xad52: str = 'DOWN'; break;
        case 0xba45: str = '1'; break;
        case 0xb946: str = '2'; break;
        case 0xb847: str = '3'; break;
        case 0xbb44: str = '4'; break;
        case 0xbf40: str = '5'; break;
        case 0xbc47: str = '6'; break;
        case 0xf807: str = '7'; break;
        case 0xea15: str = '8'; break;
        case 0xf609: str = '9'; break;
        default: str = ''; break;
    }
    return str;
}

basic.forever(() => {
    if(state == 1){
        irstate = IR_readV2();
        if(irstate != '-1'){
            control.raiseEvent(11, 22)
        }
    }
    
    basic.pause(20);
})


}
