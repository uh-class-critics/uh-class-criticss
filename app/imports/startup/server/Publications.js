import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Courses } from '../../api/course/Courses';
import { Professors } from '../../api/professors/Professors';

/** Define a publication to publish all profiles. */
Meteor.publish(Professors.userPublicationName, () => Professors.collection.find());

Meteor.publish(Courses.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Courses.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Courses.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Courses.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
