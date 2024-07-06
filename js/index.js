
var body = document.querySelector("body")
var inp = document.querySelector("#inp")
var citys = document.querySelector("#citys")
var main = document.querySelector("#main")
var inf = document.querySelector("#inf")
if(window.innerWidth < window.innerHeight){
  body.style.backgroundImage = "url('images/hor.jpg')"
}
inp.onkeyup = () => {
  citys.innerHTML = ""
  fetch(`http://api.weatherapi.com/v1/search.json?key=4367c2f5bd8c4e9bb38182539230507&q=${inp.value}`).then(res => res.json()).then(dat => {
    if(dat.length > 0){
      dat.map(data => citys.innerHTML += `<p class="city">${data.name+","+data.region+","+data.country}</p>`)
      var city = document.querySelectorAll(".city")
      for(let i=0;i<city.length;i++){
        city[i].onclick = () => {
          city[i].style.backgroundColor = "#3bc21773"
          setTimeout(() => {
            if(window.innerWidth > window.innerHeight){
              body.style.height = "fit-content";
            }
            main.style.display = "none"
            inf.style.display = "block"
            var date = new Date().toISOString().match(/\d+-\d+-\d+/i).join("")
            fetch(`http://api.weatherapi.com/v1/current.json?key=4367c2f5bd8c4e9bb38182539230507&q=${city[i].innerText}&aqi=no`).then(res => res.json()).then(data => {
              inf.innerHTML = `<span id="exit">X</span><h3>${data.location.name+","+data.location.region+","+data.location.country}</h3><div class="flex"><div><p class="temp">${data.current.temp_c} °C</p><p class="temp">${data.current.temp_f} °F</p></div><div><img class="img" src='${data.current.condition.icon}'><p class="con">${data.current.condition.text}</p></div></div><div><p>wind: ${data.current.wind_kph} kph, ${data.current.wind_mph} mph</p><p>wind direction: ${data.current.wind_dir}</p><p>pressure: ${data.current.pressure_mb} mb</p><p>cloud: ${data.current.cloud}</p></div><div class="next"></div>`                  
              fetch(`http://api.weatherapi.com/v1/forecast.json?key=4367c2f5bd8c4e9bb38182539230507&q=${city[i].innerText}&days=10&aqi=no&alerts=no`).then(res => res.json()).then(today => {
                console.log(today)
                for(let i=0;i<10;i++){
                  document.querySelector(".next").innerHTML += `<figure><h5>${today.forecast.forecastday[i].date}</h5><hr><img src="${today.forecast.forecastday[i].day.condition.icon}"><hr><figcaption>${today.forecast.forecastday[i].day.avgtemp_c} °C</figcaption></figure>`
                }
              })
              var exit = document.querySelector("#exit")
              exit.onclick = () => {
                location.reload()
              }
            })
          },300)
        }
      }
    }
  })
}