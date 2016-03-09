import Rx from 'rx';
import $script from 'scriptjs';
import $ from 'jquery';
import config from 'config';
window.jQuery = $;

require('ms-signalr-client');



class OpcStream {
    constructor() {
        this.observable = new Rx.ReplaySubject(1);
        let _this=this;
        $script(`${config.signalr}/hubs`, function() {
            _this.observable.onNext({initial: true, state: 'loaded'});

            $.connection.hub.url = `${config.signalr}/`;
            //$.connection.hub.start();
            const chat = $.connection.opcHub;
            const subscribe = (subscriptions) => {
                console.log(`subscribing ${subscriptions}`);
                chat.server.subscribe(subscriptions);
                return messagePublished;
            }
            const unsubscribe = (subscriptions) => {
                console.log(`removing ${subscriptions}`);
                chat.server.remove('tags', subscriptions);
                return messagePublished;
            }
            const messageObservable = new Rx.Subject();
            const messagePublished = messageObservable.publish();
            messagePublished.connect();

            chat.client.broadcastMessage = function(name,message){
              messageObservable.onNext({name, message});
            };
            
            




            $.connection.hub.reconnected(function () {
                _this.observable.onNext({connected: true, state:'reconnected', subscribe,unsubscribe});
            });
            $.connection.hub.reconnecting(function () {
                _this.observable.onNext({state: 'reconnecting', subscribe, unsubscribe});
            });
            $.connection.hub.disconnected(function () {
                _this.observable.onNext({state:'disconnected', subscribe, unsubscribe});
                setTimeout(
                    ()=>{
                        _this.observable.onNext({state:'restarting', subscribe, unsubscribe});
                        $.connection.hub.start().done( ()=>_this.observable.onNext({connected: true, state: 'started', subscribe, unsubscribe}));
                        }
                    ,1000);
            });
            $.connection.hub.start().done(function () {
                _this.observable.onNext({connected: true, state: 'started', subscribe, unsubscribe});
            });

        });
    }
}

export default OpcStream;