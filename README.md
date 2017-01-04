# hubot-monzo-me

[![Build Status](https://travis-ci.org/robinjmurphy/hubot-monzo-me.svg?branch=master)](https://travis-ci.org/robinjmurphy/hubot-monzo-me)

> A simple [Hubot](https://hubot.github.com/) script for generating [Monzo.me](https://monzo.me/) URLs

```
RobinM: monzo me £10 for dinner at Nando's
Hubot: https://monzo.me/robinmurphy/10?d=Dinner%20at%20Nando%27s
```

## Installation

```
npm install --save hubot-monzo-me
```

Add the script to your `external-scripts.json` file:

```json
[
  "hubot-monzo-me"
]
```

## Usage

Register your Monzo.me username with Hubot:

```
RobinM: monzo me username robinmurphy
Hubot: Thanks RobinM! I've set your Monzo username to robinmurphy
```

You can then request money from the room:

```
RobinM: monzo me £2.50 for coffee
Hubot: https://monzo.me/robinmurphy/2.50?d=Coffee
```