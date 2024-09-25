import { Command } from './command.interface.js';
import { TSVFileReader } from '#libs/file-reader/index.js';
import chalk from 'chalk';
import { Offer } from '#types/offer.type.js';
import { getErrorMessage } from '#shared/helpers/common.js';

export class ImportCommand implements Command {
  private onImportedOffer(offer: Offer): void {
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(chalk.yellowBright(`${count} rows imported.`));
  }

  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      console.error(chalk.bgRed(`Can't import data from file: ${filename}`));
      console.error(`Details: ${chalk.redBright(getErrorMessage(error))}`);
    }
  }
}
