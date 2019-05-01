const readline = require('readline-sync')

var robot = (content) => {
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
}

module.exports = robot