var weather = (function(){
  var $city, $temp, $unit, $description, $icon,$scale;
    function getWeather(){
      $.ajax({
        headers:{'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
        url: 'http://api.openweathermap.org/data/2.5/weather?q=Newyork,us&appid=129ef809c3fc3e284a78804c28ca84b4',
        type: 'GET',
        dataType: 'json'
      }).done(function(response){
        $city.html(response.name);
        $temp.html(tempConverter(response.main.temp) + ' &#176;F');
        $icon.html("<img src=http://openweathermap.org/img/w/"+ response.weather[0].icon + ".png" + " alt='Weather Icon' />")
        $description.html(response.weather[0].description);
      });
    }
    function tempConverter(temperature){
      return Math.round(((temperature - 273.15)* 9/5)+ 32)
    }
    function fahrenheitConvert(temperature){
            return Math.round((temperature *(9/5))+ 32 );
    }

    function celsiusConvert(temperature){
      return Math.round((temperature - 32) * (5/9));
    }

    function zipcodeWeather(newZip){
      $.ajax({
        headers:{'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
        url: 'http://api.openweathermap.org/data/2.5/weather?zip='+ newZip +',us&appid=129ef809c3fc3e284a78804c28ca84b4',
        type: 'GET',
        dataType: 'json'
      }).done(function(response){
        $city.html(response.name);
        $temp.html(tempConverter(response.main.temp) + ' &#176;F');
        $icon.html("<img src=http://openweathermap.org/img/w/"+ response.weather[0].icon + ".png" + " alt='Weather Icon' />")
        $description.html(response.weather[0].description);
      });
    }
    function scaleConvert(event){
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      var target = $("[rel='js-data-temp']")
      var value = $("[rel='js-data-temp']").html();
      var temperature = parseInt(value.match(/[0-9]{2}/)[0]);
      var degree = value.match(/[FC]/)[0];
      if(degree == 'F'){
       target.html(celsiusConvert(temperature)+ ' &#176;C')
       $(event.target).html('Fahrenheit')
      }else{
        target.html(fahrenheitConvert(temperature) + ' &#176;F')
       $(event.target).html('Celsius')
      }
    }


    function searchTemp(event){
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      var target = $(event.target)

      if(target.find('input[name="zipcode"]').val() == "" || isNaN(target.find('input[name="zipcode"]').val()) || (target.find('input[name="zipcode"]').val()).length !== 5 ){
        target.trigger("reset");
        return;
      }
      var newZipcode = $(event.target).find('input[name="zipcode"]').val();
      zipcodeWeather(newZipcode);
      target.trigger("reset");
    }

    function init(){
      getWeather();
      $city = $("[rel='js-data-city']");
      $temp = $("[rel='js-data-temp']");
      $icon = $("[rel='js-data-icon']");
      $description = $("[rel='js-data-description']");
      $scale = $("[rel=js-scale-convert]");

      $('form').on('submit',searchTemp);
      $scale.on('click',scaleConvert)
    }
    return {
      init: init
    }

})();

$(document).ready(weather.init);


