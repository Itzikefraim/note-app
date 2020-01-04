// core node modules we just type in require() the name ex: require('fs')
// for our files we start with ./ and then the file name ex: require('./notes.js')
// for npm modules we write the package naame. ex: require('validator')
const notes = require('./notes.js');
const chalk = require('chalk');
const yargs = require('yargs');

yargs.command(
  {
    command: 'add',
    describe: 'Add a new note',
    builder:
            {
              title:
                   {
                     describe: 'note title',
                     demandOption: true,
                     type: 'string'
                   },
              body:
                  {
                    describe: 'note body',
                    demandOption: true,
                    type: 'string'
                  }
            },
    handler(argv)
            {
              notes.addNote(argv.title, argv.body);
            }
  }
);

yargs.command(
  {
    command: 'list',
    describe: 'list notes',
    handler()
            {
              notes.listNotes()
            }
  }
);

yargs.command(
  {
    command: 'remove',
    describe: 'remove a new note',
    builder: {
        title: {
          describe: 'note title',
          type: 'string',
          demandOption: true
        }
    },
    handler(argv)
            {
              notes.removeNote(argv.title);
            }
  }
);

yargs.command(
  {
    command: 'read',
    describe: 'read a note',
    builder: {
      title: {
        describe: 'note title',
        type: 'string',
        demandOption: true
      }
    },
    handler(argv)
            {
              notes.readNote(argv.title)
            }
  }
);
yargs.parse();
