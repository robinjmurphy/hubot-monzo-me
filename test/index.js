'use strict';

const assert = require('assert');
const script = require('..');
const Hubot = require('./mockHubot');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();

describe('hubot-monzo-me', () => {
  let hubot;

  beforeEach(() => {
    hubot = new Hubot();
    hubot.use(script);
    sandbox.stub(hubot.robot.brain, 'get');
    sandbox.stub(hubot.robot.brain, 'set');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('monzo me username <username>', () => {
    it('saves the username for the current user', () => {
      hubot.receive('monzo me username robinmurphy');

      sinon.assert.calledWith(
        hubot.robot.brain.set,
        'hubot-monzo-me:RobinM:username',
        'robinmurphy'
      );
    });
  });

  describe('monzo me username', () => {
    it('returns the username registered for the currrent user', () => {
      hubot.robot.brain.get.withArgs('hubot-monzo-me:RobinM:username')
        .returns('robinmurphy');

      hubot.receive('monzo me username');

      const message = hubot.getMessages().pop();

      assert.equal(message, 'Your Monzo username is set to robinmurphy. Type "monzo me username <username>" to update it.');
    });

    it('returns a message when there is no username registered', () => {
      hubot.robot.brain.get.withArgs('hubot-monzo-me:RobinM:username')
        .returns(null);

      hubot.receive('monzo me username');

      const message = hubot.getMessages().pop();

      assert.equal(message, 'You haven\'t set your Monzo username. Type "monzo me username <username>" to set it.');
    });
  });

  describe('monzo me <amount> [reason]', () => {
    it('replies with a Monzo.me link', () => {
      hubot.robot.brain.get.withArgs('hubot-monzo-me:RobinM:username')
        .returns('robinmurphy');

      hubot.receive('monzo me £10.50 for dinner at Nando\'s');

      const message = hubot.getMessages().pop();

      assert.equal(message, 'https://monzo.me/robinmurphy/10.50?d=Dinner%20at%20Nando\'s');
    });
  });
});
