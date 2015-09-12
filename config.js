module.exports = {
  mainTemplate: '/index.ejs',
  views: {
    main: {
      'title': 'LoanApp'
    },
    contact: {
      'title': 'Contact'
    },
  },
  loanProviders: ['filarum', 'netcredit'],
  jQueryURL: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
  crawler: {
    'userAgents': [
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.125 Safari/537.36',
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:38.0) Gecko/20100101 Firefox/38.0',
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko',
      'Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A',
    ]
  },
}
