'use strict'

var chai = require('chai');
var assert = chai.assert;

var NotesApp = require('./lib/notesapplication.js');
var Note = require('./lib/notes.js');

describe('Testing to see if the note class was properly written', function(){
    it('Should be able to get property author', function(){
        var note1 = new Note('This is a testing note', 'femidotexe');
        assert(note1.author === 'femidotexe');
    });

    it('should be able to get content property', function(){
        var note2 = new Note('Another testing note', 'Oladeji');
        assert(note2.content === 'Another testing note');
    });

    it('It should not create a note without author or content', function(){
        var note3 = new Note();
        assert.isUndefined(note3.content);
    });
});

describe('Testing the createANote method', function(){
    it('The number of notes should be 0 at first', function(){
        var aNoteApp = new NotesApp();
        assert(aNoteApp.numberofnotes == 0);
    });
    it('The number of notes should be 1 after a new note was created', function(){
        var aNoteApp = new NotesApp();
        var note1 = new Note('This is a testing note', 'femidotexe');
        aNoteApp.createANote(note1);
        assert(aNoteApp.numberofnotes === 1);
    });
});

describe('Test to see if the get a note method is working', function(){
    it('should get the content: "This is a testing note" when id 1 is passed', function(){
        var aNoteApp = new NotesApp();
        var note1 = new Note('This is a testing note', 'femidotexe');
        aNoteApp.createANote(note1);
        var theNote = aNoteApp.getANote(1);
        assert(theNote.content == 'This is a testing note');
    });

    it('should get a invalid error when the note_id that does not exist', function(){
        var aNoteApp = new NotesApp();
        assert(aNoteApp.getANote(-1) == 'Invalid note id');
    });
});

describe('Test to see if deleteANote actually deletes the note', function(){
    it('I should get "Invalid note id" when deleting a note that the id is not available', function(){
        var aNoteApp = new NotesApp();
        assert(aNoteApp.deleteANote(-1) === 'Cannot delete an invalid note id');
    })
    it('should get an invalid id if i try to get a note id that has been deleted', function(){
        var aNoteApp = new NotesApp();
        var note2 = new Note('Another testing note', 'Oladeji');
        aNoteApp.createANote(note2);
        aNoteApp.deleteANote(1);
        assert(aNoteApp.getANote(1) == 'Invalid note id');
    });

    it('should update numberofnotes when a note has been deleted', function(){
        var aNoteApp = new NotesApp();
        var note2 = new Note('Another testing note', 'Oladeji');
        aNoteApp.createANote(note2);
        assert(aNoteApp.numberofnotes === 1);
        aNoteApp.deleteANote(1);
        assert(aNoteApp.numberofnotes === 0);
    });
});

describe('Test to see if editANote changes the content of the note', function(){
    it('I should get "This is an edited content" when i execute editANote(2, "This is an edited content")', function(){
        var aNoteApp = new NotesApp();
        var note4 = new Note('This is the initial content', 'Andela Fellow');
        aNoteApp.createANote(note4);
        aNoteApp.editANote(1, 'This is an edited content');
        var theNote = aNoteApp.getANote(1);
        assert(theNote.content == 'This is an edited content');
    });
});

describe('Testing the searchNotes method', function(){
    it('should show "No notes match {searchstring}"', function(){
        var aNoteApp = new NotesApp();
        var note4 = new Note('This is the initial content', 'Andela Fellow');
        aNoteApp.createANote(note4);
        var searchstring = 'qwerty';
        assert(aNoteApp.searchNotes(searchstring) === 'No notes match '+searchstring);
    });
    it('should return an array of length 1 if the searchstring is edit and also assert that the right content is returned', function(){
        var aNoteApp = new NotesApp();
        var note4 = new Note('A content that can has edit keyword in it', 'Andela Fellow');
        aNoteApp.createANote(note4);
        var searchstring = 'edit';
        var searchResults = aNoteApp.searchNotes(searchstring);
        assert.lengthOf(searchResults, 1);
        assert(searchResults[0].content === 'A content that can has edit keyword in it');
    })
})
