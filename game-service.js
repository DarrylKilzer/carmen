function GameService() {

    var defaultSearchCost = 500
    var defaultTravelCost = 800
    var countdown = 4

    var cities = ['London', 'Bangkok', 'Paris', 'Dubai', 'Instanbul', 'New York', 'Singapore', 'Kualal Lumpur', 'Seoul', 'Hong Kong', 'Tokyo', 'Barcelona', 'Amsterdam', 'Rome', 'Milan', 'Taipei', 'Vienna', 'Prague', 'Los Angeles']

    var gumShoe = {
        budget: 10000,
        city: 'New York'
    }

    var carmen = {
        firstName: 'Carmen',
        lastName: 'Sansiego tm',
        city: '',
        wanted: true
    }

    function hideCarmen() {
        setTimeout(function () {
            countdown--;
            if (countdown > 0) {
                console.log(countdown)
                return hideCarmen();
            } else {
                carmen.city = getRandomCity();
                console.log(`Oh no, it would appear that Carmen Sansiego TM, The thieving villian is on the loose its your job to track her down and bring her to justice Gumshoe. You have a budget of $${gumShoe.budget} to find her.`)
            }
        }, 1000)
    }

    function getRandomCity() {
        var randNum = Math.floor(Math.random() * cities.length)
        return cities[randNum]
    }

    function getCityIndex(city) {
        for (var i = 0; i < cities.length; i++) {
            var c = cities[i];
            if (c == city) {
                return i;
            }
        }
    }

    function getClue() {
        return `Bar Keep: "A women wearing a red hat and black boots is more likely found in ${getRandomCity()}." `
    }

    function getTravelCost(city) {
        var cost = ((defaultTravelCost * (getCityIndex(city) + 1) + (getCityIndex(gumShoe.city) + 1)) / 10).toFixed()
        return cost
    }

    function getSearchCost(city) {
        var cost = ((defaultSearchCost * (getCityIndex(city) + 1) + (getCityIndex(gumShoe.city) + 1)) / 10).toFixed()
        return cost
    }

    this.getCities = function () {
        return cities
    }

    this.getGumShoe = function () {
        return gumShoe
    }

    this.flyToCity = function (city, cb) {
        var cost = getTravelCost(city)
        if (gumShoe.budget - cost > 0) {
            gumShoe.budget -= cost
            gumShoe.city = city
            console.log(`Ticket purchased for $${cost}.`)
            console.log(`Flight departing for ${city} from ${gumShoe.city} leaving now.`)
            setTimeout(function () {
                console.log(`You have arrived at ${city} thank you for flying skyblue.`);
                cb();
            }, 1500)
        } else {
            console.error('Error: you don\'t have the budget necessary to fly there.')
        }
    }

    this.search = function (callback) {
        var cost = getSearchCost(gumShoe.city)
        if (gumShoe.budget - cost < 0) {
            console.error('Error: you don\'t have the budget necessary to search here.')
            return callback(false);
        }
        console.log('Scouring the city to find Carmen.')
        setTimeout(function () {
            gumShoe.budget -= cost;
            victory = gumShoe.city == carmen.city
            if (!victory) {
                console.log(getClue())
            }
            callback(victory);
        }, 1000)
    }

    this.reset = function (callWhenDone) {
        gumShoe.budget = 10000
        gumShoe.city = 'New York'
        hideCarmen()
        callWhenDone()
    }

    hideCarmen()
}