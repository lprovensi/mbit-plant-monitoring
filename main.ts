// Show reading in the OLED display
function ShowInOLED (temp: number, hum: number, soil: number) {
    OLED.clear()
    OLED.writeStringNewLine("Temp: " + temp + " C")
    OLED.newLine()
    OLED.writeStringNewLine("Humi: " + hum + "%")
    OLED.newLine()
    OLED.writeStringNewLine("Soil: " + Math.round(soil) + "%")
}
// Initialize the global variables with reading from sensors
function InitReadings () {
    hum = dht11_dht22.readData(dataType.humidity)
    temp = dht11_dht22.readData(dataType.temperature)
    soil = pins.map(
    pins.analogReadPin(AnalogPin.P0),
    0,
    1023,
    0,
    100
    )
    output = "ts0:" + ("" + temp) + ";hs0:" + ("" + hum) + ";ms0:" + ("" + soil)
}
let show = false
let output = ""
let soil = 0
let temp = 0
let hum = 0
basic.pause(2000)
OLED.init(128, 64)
basic.forever(function () {
    if (show) {
        InitReadings()
        ShowInOLED(temp, hum, soil)
        serial.writeLine(output)
        show = false
    } else {
        dht11_dht22.queryData(
        DHTtype.DHT11,
        DigitalPin.P1,
        true,
        false,
        true
        )
        show = dht11_dht22.readDataSuccessful()
    }
    basic.pause(5000)
})
