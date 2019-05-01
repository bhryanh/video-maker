const readline = require('readline-sync')
const state = require('./state.js')

var robot = () => {
    const content = {
        maximumSentences: 7
    }

    var askAndReturnSearchTerm = () => {
        return readline.question('Type a Wikipedia search term: ')
    }
    
    var askAndReturnPrefix = () => {
        let prefixes = ['Who is', 'What is', 'The history of']
        let selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option: ')
    
        return prefixes[selectedPrefixIndex]
    }
    
    content.searchTerm = askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()
    state.save(content)
}

module.exports = robot