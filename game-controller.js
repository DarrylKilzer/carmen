function GameController() {
    var gameService = new GameService()

    function setup() {
        var cities = gameService.getCities()

        var template = ''
        for (var i = 0; i < cities.length; i++) {
            var city = cities[i]
            template +=
                `
                <button type="button" onclick="globals.app.controllers.gameController.flyToCity('${city}')">${city}</button>
                `
        }
        document.getElementById('cities').innerHTML = template
        update(false)
    }

    function update(victory) {
        var gumShoe = gameService.getGumShoe()
        document.getElementById('city').innerHTML = gumShoe.city
        document.getElementById('budget').innerHTML = gumShoe.budget
        if (victory) {
            document.getElementById('cities').innerHTML =
                `
            <h1>Winner!</h1>
            <button type="button" onclick="globals.app.controllers.gameController.reset()">Reset</button>
            `
        }
    }

    this.flyToCity = function flyToCity(city) {
        gameService.flyToCity(city, update)
    }

    this.search = function search() {
        gameService.search(update)
    }

    this.reset = function reset(){
        gameService.reset(setup)
    }

    setup()
}