module.exports = {
  mainTemplate: '/index.ejs',
  views: {
    main: {
      'title': 'Bankierski - wiarygodna porównywarka',
      'loadAngular': true,
    },
    contact: {
      'title': 'Contact',
      'loadAngular': false,
    },
  },
  mongodb: 'mongodb://mo1328_loanapp12:Maciej4586@mongo6.mydevil.net/mo1328_loanapp12',
}
// mongoimport --db mo1328_loanapp12 --collection loans --file loans.json --jsonArray -u mo1328_loanapp12 -p
