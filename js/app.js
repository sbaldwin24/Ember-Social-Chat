App = Ember.Application.create();

Ember.Handlebars.helper('format-date', function( date ) {
  return moment( date ).fromNow();
});

App.Message = Ember.Object.extend({
  id: 3,
  firstName: 'Sterling',
  lastName: 'Baldwin',
  twitterUserName: 'sterlingbaldwin',
  text: null,
  timeStamp: null
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return [
      {
        id: 1,
        firstName: 'Sterling',
        lastName: 'Baldwin',
        twitterUserName: 'sterlingbaldwin',
        text: 'That 24 car looked great last night!',
        timeStamp: Date.now() - 400000,
      },
      {
        id: 2,
        firstName: 'Jeff',
        lastName: 'Gordon',
        twitterUserName: 'jeffgordonweb',
        text: 'Thanks, you should consider being a driver',
        timeStamp: Date.now() - 300000,
      }
    ];
  },
  actions: {
    sendMessage: function ( message ) {
      var user, messages, newMessage;

      if ( message !== '' ) {
        messages = this.modelFor( 'index' ),
        newMessage = App.Message.create({
          text: message,
          timeStamp: Date.now()
        })

        messages.pushObject( newMessage );
      }
    }
  }
});

App.GroupChatComponent = Ember.Component.extend({
  message: '',
  actions: {
    submit: function () {
      var message = this.get( 'message' ).trim(),
          conversation = this.$( 'ul' )[ 0 ];

      // Fetchs the value of 'action'
      // and sends the action with the message
      this.sendAction( 'action', message );

      // When the Ember run loop is done
      // scroll to the bottom
      Ember.run.schedule('afterRender', function () {
        conversation.scrollTop = conversation.scrollHeight;
      });

      // Reset the text message field
      this.set( 'message', '' );
    }
  }
});

App.UserAvatarComponent = Ember.Component.extend({
  avatarUrl: function () {
    var username = this.get( 'username' ),
          service = this.get( 'service' ),
          availableServices = [ 'twitter', 'facebook', 'instagram' ];

    if (  availableServices.indexOf( service ) > -1 ) {
       return 'http://avatars.io/' + service + '/' + username;
    }
    return 'images/cat.png';

  }.property( 'username' , 'service' ),

  setupTooltip: function () {
    this.$( '.avatar' ).tooltipster({
      animation: 'fade'
    });
  }.on( 'didInsertElement' ),

  destroyTooltip: function () {
    this.$( '.avatar' ).tooltipster( 'destroy' );
  }.on( 'willDestroyElement' )

});

App.TimeStampComponent = Ember.Component.extend({

  startTimer: function () {
    var currentTime = this.get('time');
    this.set('time', currentTime - 6000 );
    this.scheduleStartTimer();
  },

  scheduleStartTimer: function(){
    this._timer = Ember.run.later(this, 'startTimer', 6000);
  }.on('didInsertElement'),

  killTimer: function () {
    Ember.run.cancel( this._timer );
  }.on( 'willDestroyElement' )

});
