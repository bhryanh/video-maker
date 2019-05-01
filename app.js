const robots = {
    userInput: require('./robots/user-input.js')
}

var start = () => {
    const content = {}

    robots.userInput(content)

    console.log(content)
}

start()