SearchSource.defineSource('events', function(searchText, options) {
    // search options going on here
    var options = {};
    if(searchText) {
        var regExp = buildRegExp(searchText);
        var selector = {$or: [
            {name: regExp},
            {location: regExp},
            {ownerName: regExp},
            {description: regExp}
        ]};
        return Events.find(selector, options).fetch();
    } else {
        return Events.find({}, options).fetch();
    }
});

function buildRegExp(searchText) {
    // this is a dumb implementation
    var parts = searchText.trim().split(/[ \-\:]+/);
    return new RegExp("(" + parts.join('|') + ")", "ig");
}