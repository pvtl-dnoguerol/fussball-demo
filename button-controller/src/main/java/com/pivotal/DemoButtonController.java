package com.pivotal;

import com.fazecast.jSerialComm.SerialPort;

import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

public class DemoButtonController {
    private static String PORT = "cu.usbmodem14111231";
    private static String FLY_BIN = "/usr/local/bin/fly";
    private static String FLY_TARGET = "wings";
    private static String FLY_PIPELINE = "fussball-demo";
    private static String FLY_JOB1 = "job-service-prod";
    private static String FLY_JOB2 = "job-www-prod";

    private SerialPort port;
    private boolean foundDevice = false;

    private DemoButtonController() {
        System.out.print("Found serial ports: ");
        for (SerialPort port : SerialPort.getCommPorts()) {
            System.out.print(port.getSystemPortName() + " ");
        }
        System.out.println();

        try {
            Properties props = new Properties();
            props.load(new FileReader("button.properties"));
            PORT = props.getProperty("port", PORT);
            FLY_BIN = props.getProperty("flyPath", FLY_BIN);
            FLY_TARGET = props.getProperty("target", FLY_TARGET);
            FLY_PIPELINE = props.getProperty("pipeline", FLY_PIPELINE);
            FLY_JOB1 = props.getProperty("job1", FLY_JOB1);
            FLY_JOB2 = props.getProperty("job1", FLY_JOB2);
            System.out.println("Loaded configuration file");
        } catch (IOException e) {
            System.out.println("Configuration file not found; using defaults");
        }

        port = SerialPort.getCommPort(PORT);
        if (port.openPort()) {
            System.out.println("Serial port successfully opened");
        } else {
            System.err.println("Unable to open serial port :-(");
            System.exit(1);
        }
    }

    private void loop() {
        int read;
        byte[] buffer = new byte[256];
        while (true) {
            read = port.readBytes(buffer, 1);
            if (read > 0) {
                if (buffer[0] == 'P' && !foundDevice) {
                    System.out.println("Found button device!");
                    foundDevice = true;
                } else if (buffer[0] == 'B') {
                    onButtonPressed();
                }
            }
            try {
                Thread.sleep(25);
            } catch (InterruptedException ignored) {}
        }
    }

    private void onButtonPressed() {
        System.out.println("Button pressed!");
        try {
            // trigger service job
            Process p = new ProcessBuilder(FLY_BIN, "-t", FLY_TARGET, "trigger-job", "-j", FLY_PIPELINE + "/" + FLY_JOB1).inheritIO().start();
            System.out.println(FLY_BIN + " -t " + FLY_TARGET + " trigger-job -j " + FLY_PIPELINE + "/" + FLY_JOB1);
            p.waitFor();
            if (p.exitValue() != 0) {
                System.out.println("Unable to start service prod job");
            }
            // trigger www job
            p = new ProcessBuilder(FLY_BIN, "-t", FLY_TARGET, "trigger-job", "-j", FLY_PIPELINE + "/" + FLY_JOB2).inheritIO().start();
            System.out.println(FLY_BIN + " -t " + FLY_TARGET + " trigger-job -j " + FLY_PIPELINE + "/" + FLY_JOB2);
            p.waitFor();
            if (p.exitValue() != 0) {
                System.out.println("Unable to start www prod job");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        DemoButtonController dbc = new DemoButtonController();
        dbc.loop();
    }
}
