#include "ESP8266WiFi.h"
#include <ESP8266HTTPClient.h>
#include <aJSON.h>

// WiFi parameters to be configured
const char* ssid = "Pi3-AP";
const char* password = "viaDellaBandita3";

// function definitions
char* parseJson(char *jsonString) ;

void setup(void)
{ 
  Serial.begin(9600);
  // Connect to WiFi
  WiFi.begin(ssid, password);

  // while wifi not connected yet, print '.'
  // then after it connected, get out of the loop
  while (WiFi.status() != WL_CONNECTED) {
     delay(500);
     Serial.print(".");
  }
  //print a new line, then print WiFi connected and the IP address
  Serial.println("");
  Serial.println("WiFi connected");
  // Print the IP address
  Serial.println(WiFi.localIP());

}
void loop() {
  HTTPClient http;

  //GET request for device value 
  http.begin("http://172.24.1.1:10010/value?deviceName=relay_forno");
  int httpCode = http.GET();
  if (httpCode == HTTP_CODE_OK) {
      Serial.print("HTTP response code: ");
      Serial.println(httpCode);
      String response = http.getString();
      //Serial.println(response);
      // Json string to parse
      char jsonString[50];
      response.toCharArray(jsonString, 50);
      Serial.println(jsonString);
      char* value = parseJson(jsonString);
      if (value) {
        Serial.println(F("Successfully Parsed: "));
        Serial.println(value);
      } else
        Serial.println(F("There was some problem in parsing the JSON"));
  }
  else
    Serial.println("Error in HTTP request");

  delay(5000);
}

char* parseJson(char *jsonString) {
    char* val;

    aJsonObject* root = aJson.parse(jsonString);

    if (root != NULL) {
        //Serial.println("Parsed successfully 1 " );
        aJsonObject* value = aJson.getObjectItem(root, "value"); 
        val = value->valuestring;
    }

    if (val) {
        return val;
    } else {
        return NULL;
    }
}
