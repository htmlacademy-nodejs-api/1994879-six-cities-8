import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    const dbParams = chalk.magenta('<db.login> <db.password> <db.host> <db.name> <db.salt>');
    console.info(`
      ${chalk.bold('Программа для подготовки данных для REST API сервера.')}
      ${chalk.dim('Пример:')}
        cli.js ${chalk.blueBright('--<command>')} ${chalk.dim('[--arguments]')}
      ${chalk.dim('Команды:')}
        --version:                   ${chalk.green('# выводит номер версии')}
        --help:                      ${chalk.green('# печатает этот текст')}
        --import ${chalk.blueBright('<path>')} ${dbParams}:
                                     ${chalk.green('# импортирует данные из TSV')}
        --generate ${chalk.blueBright('<n> <path> <url>')}  ${chalk.green('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
