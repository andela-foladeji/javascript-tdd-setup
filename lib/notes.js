// Note class

module.exports = function(content, author) {
    if(content === undefined || author === undefined){
        return;
    }
    this.content = content;
    this.author = author;
    this.noteid = 0;
}