module.exports = {
  mainTemplate: '/index.ejs',
  views: {
    provider: {
      'title': 'Bankierski - wiarygodna porównywarka',
      'loadAngular': true,
    },
    main: {
      'title': 'Bankierski - wiarygodna porównywarka',
      'loadAngular': true,
    },
    contact: {
      'title': 'Contact',
      'loadAngular': false,
    },
    about: {
      'title': 'Bankierski - o nas',
      'loadAngular': true,
    },
    conditions: {
      'title': 'Bankierski - regulamin serwisu',
      'loadAngular': false,
    },
    redirect: {
      'title': 'Bankierski - przekierowanie',
      'loadAngular': false,
    },
  },
  distributorId: 25044,
  redirectTime: 2000,
  mongodb: 'mongodb://mo1328_loanapp12:Maciej4586@mongo6.mydevil.net/mo1328_loanapp12',
}
// mongoimport --db mo1328_loanapp12 --collection loans --file loans.json --jsonArray -u mo1328_loanapp12 -p
