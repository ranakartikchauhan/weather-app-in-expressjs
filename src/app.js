const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 8000;



const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.set('view engine', 'hbs');
app.set("views", template_path);
hbs.registerPartials(partials_path);

// console.log(static_path);
app.use(express.static(static_path));

app.get("", (req,res) =>{
    res.render('index')
})

app.get("/about", (req,res) =>{
    res.render('about')
})


app.get("/weather", (req,res) =>{
    const { DateTimeFormat } = Intl;

// Get the current date and time
const currentDate = new Date();

// Get the time zone offset in minutes
const timeZoneOffset = currentDate.getTimezoneOffset();

// Calculate the time zone offset in hours and minutes
const offsetHours = Math.abs(Math.floor(timeZoneOffset / 60));
const offsetMinutes = Math.abs(timeZoneOffset % 60);

// Determine the sign of the time zone offset
const offsetSign = timeZoneOffset > 0 ? '-' : '+';

// Format the time zone offset as a string
const formattedTimeZoneOffset = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;

console.log(`Current time zone offset: GMT${formattedTimeZoneOffset}`);
    res.render('weather')
})


app.get("*", (req,res) =>{
    res.render('404page', {
        errorMsg : "Opps! page not found, Click Here to go back"
    })
})


app.listen(port, () => {
    console.log(`listening to the port no at ${port}`);
})
