/* eslint-disable no-restricted-globals, no-console */

const { SiteChecker } = require('broken-link-checker'); // eslint-disable-line import/no-unresolved
const chalk = require('chalk');
const path = require('path');
const execa = require('execa');

const SITE_TO_CHECK = 'docs/next/api';
const ACCEPTABLE_STATUS_CODES = [undefined, 200, 429];

const brokenLinks = []; // should populate with objects, eg. {statusCode: number, url: string}

const spawnProcess = (command, options = {}) => {
  const cmdSplit = command.split(' ');
  const mainCmd = cmdSplit[0];

  cmdSplit.shift();

  if (!options.silent) {
    options.stdin = options.stdin ?? 'inherit';
    options.stdout = options.stdout ?? 'inherit';
    options.stderr = options.stderr ?? 'inherit';
  }

  return execa(mainCmd, cmdSplit, options);
};

// start server
spawnProcess(`http-server ${path.resolve('.vuepress', 'dist')} -s 8080`);

const siteChecker = new SiteChecker(
  {
    excludeInternalLinks: false,
    excludeExternalLinks: false,
    filterLevel: 0,
    acceptedSchemes: ['http', 'https'],
    excludedKeywords: [
      'linkedin', // it always throws an error even if link really works
      'github',
      '*/docs/*.*' // exclude links on version pages
    ]
  },
  {
    error: (error) => {
      displayErrorMessage(error);
    },

    link: (result) => {
      if (result.broken) {
        if (result.http.response && !ACCEPTABLE_STATUS_CODES.includes(result.http.response.statusCode)) {

          brokenLinks.push({
            statusCode: result.http.response.statusCode,
            url: result.url.original,
            internal: result.internal
          });

          if (result.internal) {
            console.log(chalk.red(`broken internal link ${result.http.response.statusCode} => ${result.url.original}`));
          } else {
            console.log(chalk.yellow(`broken external link ${result.http.response.statusCode} => ${result.url.original}`));
          }

        }
      }
    },

    end: () => {
      console.log(chalk.green('CHECK FOR BROKEN LINKS FINISHED'));
      const internalLinksCount = brokenLinks.filter(link => link.internal).length;
      const externalLinksCount = brokenLinks.filter(link => !link.internal).length;

      if (internalLinksCount) {
        console.log(chalk.red(`
TOTAL BROKEN LINKS:
Internal: ${internalLinksCount}
External: ${externalLinksCount}
        `));

        process.exit(1);
      }

      if (!internalLinksCount && externalLinksCount) {
        console.log(chalk.yellow(`
EXTERNAL BROKEN LINKS: ${externalLinksCount}
        `));
        process.exit(0);
      }

      console.log(chalk.green('EVERY LINK IS WORKING!'));
      process.exit(0);
    }
  }
);

// run siteChecker
// timeout is needed because siteChecker would open URL before server started
setTimeout(() => {
  console.log(chalk.green('CHECK FOR BROKEN LINKS STARTED'));
  siteChecker.enqueue(`http://127.0.0.1:8080/${SITE_TO_CHECK}`);
}, 500);