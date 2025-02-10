// start-logger-client-options
const client = new MongoClient("<connection string>", {
  mongodbLogComponentSeverities: {
    all: "debug",
    command: "off"
  }
});
// end-logger-client-options

// start-log-location
const mongodbLogComponentSeverities = {
    all: "debug"
};

const mongodbLogPath = "stderr";
const client = new MongoClient("<connection string>", 
    { mongodbLogComponentSeverities, mongodbLogPath }
);
// end-log-location

// start-custom-logger
import fs from 'node:fs/promises';
import util from 'node:util';

const mongodbLogPath = {
  file: await fs.open(`./server-${+new Date()}.logs`, 'w'),
  async write(log) {
    try {
      await this.file?.appendFile(util.inspect(log) + '\n');
    } catch (fileError) {
      console.log('cannot log anymore', fileError);
      this.file = null;
    }
  }
}

const client = new MongoClient("<connection string>", { mongodbLogPath });
// end-custom-logger

// start-log-length
const mongodbLogComponentSeverities = {
all: "debug"
};

const mongodbLogLength = 500;
const client = new MongoClient("<connection string>", {
    mongodbLogComponentSeverities,
    mongodbLogLength
  });
// end-log-length

