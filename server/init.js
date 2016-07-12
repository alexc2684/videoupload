Meteor.publish("uploads", function () {
  console.log("publishing files");
  var uploads = Uploads.find({});
  console.log("returning " + uploads.fetch().length + " uploads");
  return uploads;
});

Meteor.methods({
  'deleteFile': function (_id) {
    check(_id, String);

    var upload = Uploads.findOne(_id);
    if (upload == null) {
      throw new Meteor.Error(404, 'Upload not found');
    }
    UploadServer.delete(upload.path);
    Uploads.remove(_id);
  }
})

Meteor.startup(function () {
  UploadServer.init({
    tmpDir:'/Users/achan/Projects/meteor/videoUploader/uploads/tmp',
    uploadDir: '/Users/achan/Projects/meteor/videoUploader/uploads/',
    checkCreateDirectories: true,
    finished: function (fileInfo, formFields) {
      console.log("upload finished, fileInfo ", fileInfo);
      console.log("upload finished, formFields: ", formFields);
      Uploads.insert(fileInfo);
    },
    cacheTime: 100,
    mimeTypes: {
      "xml": "application/xml",
      "vcf": "text/x-vcard"
    },
    validateRequest: function (req, res) {
      // to validate, one way to do it would be to form your download urls on the client to pass in some token
      // that we can use to look up the current user by the token
      //console.log("token passed in: ", req.query.token);
      // possibly hit the users collection to see if the token is valid by looking at the hashed resume tokens
      //var user = Users.findOne({"services.resume.loginTokens":{$elemMatch:{"hashedToken":req.query.token}}});
      //console.log("user ", user);
      //if you want to allow the download, return nothing
      //// if you want to prevent the download, return a string with the error message, like:
      //return "cannot download this file,, sorry";
    }
  })
});
