import { Command } from './command.interface.js';
import { TSVFileReader } from '#libs/file-reader/index.js';
import chalk from 'chalk';
import { Offer } from '#types/index.js';
import { getErrorMessage } from '#shared/helpers/common.js';
import { ConsoleLogger, Logger } from '#libs/logger/index.js';
import { DatabaseClient } from '#libs/database-client/index.js';
import { getMongoURI } from '#shared/helpers/database.js';
import { DEFAULT_DB_PORT } from './command.constant.js';

export class ImportCommand implements Command {
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedOffer(offer: Offer, resolve: () => void) {
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: Offer) {
    this.logger.debug(JSON.stringify(offer));
  }

  private onCompleteImport(count: number) {
    console.info(chalk.yellowBright(`${count} rows imported.`));
    this.databaseClient.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;
    this.logger.debug(this.salt);

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
      await this.databaseClient.disconnect();
    } catch (error) {
      console.error(chalk.bgRed(`Can't import data from file: ${filename}`));
      console.error(`Details: ${chalk.redBright(getErrorMessage(error))}`);
    }
  }
}
