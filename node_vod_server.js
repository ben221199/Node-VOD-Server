//
//  Created by Mingliang Chen on 17/8/1.
//  illuspas[a]gmail.com
//  Copyright (c) 2018 Nodemedia. All rights reserved.
//

const Https = require('https');
const Logger = require('./node_core_logger');
const NodeHttpServer = require('./node_http_server');
const context = require('./node_core_ctx');
const Package = require("./package.json");

class NodeVODServer {
  constructor(config) {
    this.config = config;
  }

  run() {
    Logger.setLogType(this.config.logType);
    Logger.log(`Node VOD Server v${Package.version}`);

    if (this.config.http) {
      this.nhs = new NodeHttpServer(this.config);
      this.nhs.run();
    }
  }

  on(eventName, listener) {
    context.nodeEvent.on(eventName, listener);
  }

  stop() {
    if (this.nhs) {
      this.nhs.stop();
    }
  }

  getSession(id) {
    return context.sessions.get(id);
  }
}

module.exports = NodeVODServer