import chalk from 'chalk';
import { Command } from './command.interface.js';

export class GenerateCommand implements Command {
  getName(): string {
    return '--generate';
  }

  execute(..._parameters: string[]): void {
    console.info(chalk.bgRed('Method not implemented.'));
  }
}
