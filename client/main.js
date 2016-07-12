Meteor.subscribe('uploads');
Template.uploadTemplate.helpers({
  theUploads: function () {
    console.log(Uploads.find());
    return Uploads.find({}, {sort: {"name": 1}});
  },
  myCallbacks: function () {
    return {
      finished: function (index, fileInfo, context) {
        console.log('This function will execute after each fileupload is finished on the client');
        console.log("index ", index);
        console.log("fileInfo ", fileInfo);
        console.log("context ", context);
      }

    }
  },
  someStuff: function () {
    return {data: null}
  }
});
Template.uploadTemplate.events({
  'click #deleteFileButton ': function (event) {
    Meteor.call('deleteFile', this._id);
  }
})
