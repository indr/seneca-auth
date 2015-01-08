
var LocalStrategy = require('passport-local').Strategy

module.exports = function (seneca) {

  var authPlugin = new LocalStrategy(
    function (username, password, done) {
      seneca.log.info('user local login', username)
      seneca.act({role: 'user', cmd: 'login', nick: username, email: username, password: password},
        function( err, out ) {
          if(err) {
            seneca.log.error(err)
            done(err, undefined)
          } else {
            done( (!out || !out.ok) ? out : undefined, out )
          }

        })
    }
  )

  seneca.act({role: 'auth', cmd: 'register_service', service: 'local', plugin: authPlugin})
}