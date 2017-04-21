#include "ESP8266WiFi.h"
#include <ESP8266HTTPClient.h>

// WiFi parameters
const char* ssid = "Pi3-AP";
const char* password = "viaDellaBandita3";

// Pin parameters
const int GPIO5 = 5;

void setup(void) {
  Serial.begin(9600);
  
  //Configure PIN
  pinMode(GPIO5, OUTPUT);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
     delay(500);
     Serial.print(".");
  }
  Serial.println(WiFi.localIP());
}

void loop() {
  HTTPClient http;

  //GET request for device relay_forno
  http.begin("http://172.24.1.1:10010/value?deviceName=relay_forno");
  int httpCode = http.GET();
  if (httpCode == HTTP_CODE_OK) {
      Serial.println(httpCode);
      //Get API response
      String response = http.getString();
      Serial.println(response);
      
      //Parse val value
      int val = response.charAt(9) - '0'; // - '0' convert char to int
      if (val == 0)
        digitalWrite(GPIO5, LOW); //Set pin off
      else
        digitalWrite(GPIO5, HIGH); //Set pin on
  }
  else
    Serial.println("Error in HTTP request");

  delay(5000);
}

