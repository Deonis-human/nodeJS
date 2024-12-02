#!/usr/bin/env node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const noArgsDateCheck = (yargs) => {
  yargs
    .check((argv) => {
      if (!argv.year && !argv.month && !argv.date) {
        throw new Error('One of this flags must be given: --year (-y), --month (-m), --date (-d)');
      }
      return true;
    })
}

const dateOperationsHandler = (argv, isAdd) => {
  const date = new Date();
  const modifier = isAdd ? 1 : -1;

  if (argv.year) {
    date.setFullYear(date.getFullYear() + modifier * argv.year);
  }
  if (argv.month) {
    date.setMonth(date.getMonth() + modifier * argv.month);
  }
  if (argv.date) {
    date.setDate(date.getDate() + modifier * argv.date);
  }

  return date;
}

yargs(hideBin(process.argv))
  .scriptName('date')
  .usage('$0 <command> [args]')
  .command(
    'current',
    'Current date print',
    () => { },
    (argv) => {
      const date = new Date();

      if (argv.year) {
        return console.log('Year: ', date.getFullYear());
      }
      if (argv.month) {
        return console.log('Month: ', date.getMonth() + 1);
      }
      if (argv.date) {
        return console.log('Date: ', date.toLocaleDateString());
      }
      return console.log('Date (ISO): ', date.toISOString());
    })
  .command(
    'add',
    'Add some period to current date and print it in ISO format',
    (yargs) => {
      yargs
        .check((argv) => {
          if (!argv.year && !argv.month && !argv.date) {
            throw new Error('One of this flags must be given: --year (-y), --month (-m), --date (-d)');
          }
          return true;
        })
    },
    (argv) => {
      const date = dateOperationsHandler(argv, true);

      console.log('New date (ISO): ', date.toISOString());
    })
  .command(
    'sub',
    'Sub some period from current date and print it in ISO format',
    noArgsDateCheck,
    (argv) => {
      const date = dateOperationsHandler(argv, false);

      console.log('New date (ISO): ', date.toISOString());
    })
  .option(
    'year',
    {
      alias: 'y',
      describe: 'year flag',
      conflicts: ['m', 'd'],
    }
  ).option(
    'month',
    {
      alias: 'm',
      describe: 'month flag',
      conflicts: ['y', 'd'],
    }
  ).option(
    'date',
    {
      alias: 'd',
      describe: 'date flag',
      conflicts: ['y, m'],
    }
  )
  .help()
  .argv;
