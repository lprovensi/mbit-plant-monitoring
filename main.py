output = ""
soil = 0
temp = 0
hum = 0
basic.pause(2000)
show = False

def on_forever():
    global hum, temp, soil, output, show
    if show:
        hum = dht11_dht22.read_data(dataType.HUMIDITY)
        temp = dht11_dht22.read_data(dataType.TEMPERATURE)
        soil = pins.map(pins.analog_read_pin(AnalogPin.P0), 0, 1023, 0, 100)
        output = "ts0:" + str(temp) + ";hs0:" + str(hum) + ";ms0:" + str(soil)
        basic.show_string("" + str((temp)))
        basic.show_string("" + str((hum)))
        serial.write_line(output)
        show = False
    else:
        dht11_dht22.query_data(DHTtype.DHT11, DigitalPin.P1, True, False, True)
        show = dht11_dht22.read_data_successful()
    basic.pause(5000)
basic.forever(on_forever)
