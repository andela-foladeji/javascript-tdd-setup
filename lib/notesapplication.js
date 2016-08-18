// NotesApplication class

module.exports = function() {
    
    this.notes = [];
    this.currentId = 1;
    this.numberofnotes = 0;
    
    
    /**
     *createANote method is used to add a new note
     * @param {string} content is the text of the note that is been added
     * @param {string} author is the author's name for the text
     */
    this.createANote = function(note) {
        if (note.hasOwnProperty('content') ) {
            note.noteid = this.currentId;
            this.notes.push(note);
            this.currentId++;
            this.numberofnotes++;
            return;
        }else{
            return ('Invalid note');
        }
    }
    
    /**
     * this method list all the notes. No param is required
     */ 
    this.listAllNotes = function() {
        if(this.notes.length > 0) {
            console.log('Total notes are '+this.notes.length);
            for(let count = 0; count < this.notes.length; count++) {
                if(this.notes[count] !== undefined) {
                    console.log('Note ID: '
                    +this.notes[count].noteid+'\n'
                    +this.notes[count].noteContent
                    +'\nBy Author '
                    +this.notes[count].author+'\n');
                }
            }
        }else{
            console.log('No note to list yet');
        }
    }
    
    /**
     * this method gets the string details of a particular note
     * @param {number} note_id is a unique description
     */ 
    this.getANote = function(note_id) {
        for(let count = 0; count < this.notes.length; count++) {
            if(this.notes[count].noteid === note_id) {
                return this.notes[count];
            }
        }
        return ('Invalid note id');
    }
    
    /**
     * this function loops through the array to check if any noteContent 
     * contains a string
     * @param {string} searchString is the substring we are searching for
     */ 
    this.searchNotes = function(searchString) {
        //let returnString = 'Showing results for '+searchString+'\n';
        var foundNotes = [];
        var count = 0;
        for(var id = 0; id < this.notes.length; id++) {
            if(this.notes[id].content.indexOf(searchString) !== -1) {
                foundNotes.push(this.notes[id]);
                /*returnString += 'Note ID: '
                +this.notes[id].noteid+'\n'
                +this.notes[id].noteContent+'\nBy author '
                +this.notes[id].author+'\n';*/
                count++;
            }
        }
        if(count === 0) {
            return 'No notes match '+searchString;
            //returnString += '\n No result found for the search';
        }
        return foundNotes;
    }
    
    /**
     * this method simply sets the note_id to null but checks if the id exist
     * @param note_id is the index
     */ 
    this.deleteANote = function(note_id) {
        for(let count = 0; count < this.notes.length; count++) {
            if(this.notes[count].noteid == note_id) {
                this.notes.splice(count, 1);
                this.numberofnotes--;
                return;
            }
        }
        return('Cannot delete an invalid note id');

    }
    
    /** 
     * this method is used to edit a note_id
     * @param note_id is the index
     * @param note_content is the new content
     */ 
    this.editANote = function(note_id, note_content) {
        for(let count = 0; count < this.notes.length; count++) {
            if(this.notes[count].noteid == note_id) {
                this.notes[count].content = note_content;
            }
        }
    }
}