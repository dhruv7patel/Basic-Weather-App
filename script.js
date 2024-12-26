//http://api.weatherapi.com/v1/current.json?key=f675523868194b62bb532822242612&q=Brampton&aqi=no

let form = document.getElementById("form");

function search(event){
    event.preventDefault();
    let target = document.getElementById("search").value;
    fetchData(target);
}

function update(locationName, currentTime, temp, currentCondition){

    let splitDate = currentTime.split(' ')[0];
    let splitTime = currentTime.split(' ')[1];
    let currentDay = getDayName(new Date(splitDate).getDay());

    let temperatureField = document.getElementById("temp");
    let locationField = document.getElementById("location");
    let timeField = document.getElementById("time");
    let conditionField = document.getElementById("condition");

    locationField.innerHTML = locationName;
    temperatureField.innerHTML = temp + 'C';
    timeField.innerHTML = `${splitTime} ${currentDay} ${splitDate}`;
    conditionField.innerHTML = currentCondition;

}

function getDayName(number){
    switch(number){
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        
    }
}

let fetchData = async(target) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=f675523868194b62bb532822242612&q=${target}&aqi=no`;

    let result = await fetch(url);
    let data = await result.json();
    console.log(data);

    let locationName = data.location.name;
    let currentTime = data.location.localtime;
    let temp = data.current.temp_c;
    let currentCondition = data.current.condition.text;

    update(locationName, currentTime, temp, currentCondition);
}

form.addEventListener('submit', search);

