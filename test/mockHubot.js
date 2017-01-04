'use strict';

class Robot {
  constructor() {
    this.listeners = [];
    this.messages = [];
    this.brain = {
      get: () => {},
      set: () => {}
    };
  }

  hear(pattern, cb) {
    this.listeners.push({
      pattern,
      cb
    });
  }

  send(opts, message) {
    this.messages.push(message);
  }

  respond(pattern, cb) {
    this.listeners.push({
      pattern,
      cb
    });
  }

  receive(message) {
    const sendMessage = (message) => {
      this.messages.push(message);
    };

    this.listeners.forEach((listener) => {
      if (listener.pattern.test(message)) {
        listener.cb({
          match: message.match(listener.pattern),
          reply: sendMessage,
          send: sendMessage,
          message: {
            user: {
              name: 'RobinM'
            }
          }
        });
      }
    });
  }
}

class Hubot {
  constructor() {
    this.robot = new Robot();
  }

  use(script) {
    script(this.robot);
  }

  receive(message) {
    this.robot.receive(message);
  }

  getMessages() {
    return this.robot.messages;
  }
}

module.exports = Hubot;
