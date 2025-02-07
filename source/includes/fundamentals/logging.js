// start-logger-client-options
const client = new MongoClient("<connection string">, {
  mongodbLogComponentSeverities: {
    all: "debug",
    command: "off"
  }
});
// end-logger-client-options

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

const client = new MongoClient("...", { mongodbLogPath });
// end-custom-logger