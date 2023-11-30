// load .env data into process.env
require('dotenv').config();

// other dependencies
const fs = require('fs');
const chalk = require('chalk');
const db = require('../database/connection');

const runSQLFilesByDirectory = async (directory) => {
  console.log(chalk.cyan(`-> Loading ${directory} Files ...`));
  const filenames = fs.readdirSync(`./database/${directory}`);

  for (const filename of filenames) {
    const sql = fs.readFileSync(`./database/${directory}/${filename}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(filename)}`);
    await db.query(sql);
  }
};

const runResetDB = async () => {
  try {
    console.log(chalk.bgMagenta(`-> Connecting to database ${process.env.DB_NAME} on ${process.env.DB_HOST} as ${process.env.DB_USER}...\n`));

    await runSQLFilesByDirectory('schema');
    await runSQLFilesByDirectory('seeds');

    console.log();
    process.exit();
  } catch (err) {
    console.error(chalk.red(`Failed due to error: ${err}`));
    process.exit();
  }
};

runResetDB();
