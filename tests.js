'use strict'

var chai = require('chai');
var assert = chai.assert;

var NotesApp = require('./lib/notesapplication.js');
var Note = require('./lib/notes.js');

var aNoteApp = new NotesApp();
var note1 = new Note('This is a testing note', 'femidotexe');
var note2 = new Note('Another testing note', 'Oladeji');
var note3 = new Note();
var note4 = new Note('TDD is really cool, why haven\'t I been doing this');

describe('Testing to see if the note class was properly written', function(){
    it('Should be able to get property author', function(){
        assert(note1.author === 'femidotexe');
    });

    it('should be able to get content property', function(){
        assert(note2.content === 'Another testing note');
    });

    it('It should not create a note without author or content', function(){
        assert.isUndefined(note3.content);
    });
});

describe('Testing the createANote method', function(){
    it('The number of notes should be 0 at first', function(){
        assert(aNoteApp.numberofnotes == 0);
    });
    it('The number of notes should be 1 after a new note was created', function(){
        aNoteApp.createANote(note1);
        assert(aNoteApp.numberofnotes == 1);
        aNoteApp.createANote(note2);
    })
});

describe('Test to see if the get a note method is working', function(){
    it('I should get the content: "This is a testing note" when id 1 is passed', function(){
        var theNote = aNoteApp.getANote(1);
        assert.equal(theNote.content, 'This is a testing note');
    });

    it('I should get a invalid error when i pass an id that does not exist', function(){
        assert(aNoteApp.getANote(-1) == 'Invalid note id');
    });

    it('should return Invalid note id if a noteid of 0.5 was passed like Maryam suggested yesterday', function(){
        assert(aNoteApp.getANote(0.5) == 'Invalid note id');
    })
});

describe('Test to see if deleteANote actually deletes the note', function(){
    it('I should get "Invalid note id" when deleting a note that the id is not available', function(){
        assert(aNoteApp.deleteANote(-1) === 'Cannot delete an invalid note id');
    })
    it('I should get an invalid id if i try to get a note id that has been deleted', function(){
        aNoteApp.deleteANote(1);
        assert(aNoteApp.getANote(1) == 'Invalid note id');
    });

    it('After deleting a node the numberofnotes should have become 1', function(){
        assert(aNoteApp.numberofnotes === 1);
    });
});

describe('Test to see if editANote changes the content of the note', function(){
    it('I should get "This is an edited content" when i execute editANote(2, "This is an edited content")', function(){
        aNoteApp.createANote(note4);
        aNoteApp.editANote(2, 'This is an edited content');
        var theNote = aNoteApp.getANote(2);
        assert(theNote.content == 'This is an edited content');
    });
});

describe('Testing the searchNotes method', function(){
    it('should show "No notes match {searchstring}"', function(){
        var searchstring = 'qwerty';
        assert(aNoteApp.searchNotes(searchstring) === 'No notes match '+searchstring);
    });
    it('should return an array of length 1 if the searchstring is edited', function(){
        var searchstring = 'edited';
        assert.lengthOf(aNoteApp.searchNotes(searchstring), 1);
    })
})
