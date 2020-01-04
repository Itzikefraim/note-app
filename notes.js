const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
  return "Your notes..."
}

const listNotes = () => {
  console.log(chalk.bgWhite('Your notes:'))
  const notes = loadNotes()
  notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title)
  if (note)
    console.log(note.body)
  else
    console.log(chalk.red('Note ' + title + ' was not found'))
}

const addNote = (title, body) => {
  const notes = loadNotes();
  //const duplicateNotes = notes.filter((note) => note.title === title) this one goes through the whole array
  const duplicateNote = notes.find((note) => note.title === title) // this one stops when finds a duplicate

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });

    console.log(chalk.bgGreen('Note was added'));
    saveNotes(notes);
  } else {
    console.log(chalk.bgRed("Note title is taken"));
  }
}

const removeNote = (title) => {
  const notes = loadNotes();
  const newNotes = notes.filter((note) => (!(note.title === title)))

  if (notes.length === newNotes.length)
    console.log(chalk.bgRed('Note was not found'));
  else
    console.log(chalk.bgGreen('Note removed'));

  saveNotes(newNotes);
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);

  } catch (e) {
    return [];
  }


}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
