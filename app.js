const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/index.html");
  //res.sendFile(__dirname+"/styles.css");
});
app.post("/result",function(req,res)
{ var cityName = req.body.city;

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=c023469b3151635dd12e4de43900e152";
     https.get(url,function(response)
     {
        response.on("data",function(data)
         {   const weatherData = JSON.parse(data);
           const icon = weatherData.weather[0].icon;
           const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
             console.log(response.statusCode);
            res.write("<h1>The weather is currently in "+cityName+ " is "+ weatherData.weather[0].description + "</h1>");
             res.write("<h2>Temperatutre is " + weatherData.main.temp  + " degree celcius.</h2>");
             res.write("<img src="+ imgUrl+">");
            res.end()
         });
      });


});


















app.listen(3000,function()
{
  console.log("Server running at 3000");
});
