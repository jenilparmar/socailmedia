const userAccountSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    profile_info: {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      bio: String,
      avatar_url: String,
      created_at: { type: Date, default: Date.now }
    },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  });
  
  const UserAccount = mongoose.model('UserAccount', userAccountSchema);
  
  const userPostSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'UserAccount', required: true },
    content: { type: String, required: true },
    media: [String], // URLs to images/videos
    created_at: { type: Date, default: Date.now },
    likes: [{ type: Schema.Types.ObjectId, ref: 'UserAccount' }], // List of user IDs who liked the post
    comments: [{ type: Schema.Types.ObjectId, ref: 'UserComment' }] // List of comment IDs
  });
  
  const UserPost = mongoose.model('UserPost', userPostSchema);
  const userCommentSchema = new Schema({
    post_id: { type: Schema.Types.ObjectId, ref: 'UserPost', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'UserAccount', required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    likes: [{ type: Schema.Types.ObjectId, ref: 'UserAccount' }]
  });
  
  const UserComment = mongoose.model('UserComment', userCommentSchema);
  const userchatSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'UserAccount', required: true }],
    messages: [
      {
        sender_id: { type: Schema.Types.ObjectId, ref: 'UserAccount', required: true },
        content: { type: String, required: true },
        created_at: { type: Date, default: Date.now }
      }
    ]
  });
  
  const Userchat = mongoose.model('UserChat', userChatSchema);
  

export default {UserAccount, UserComment ,UserPost ,Userchat}
const UserAccount = mongoose.model('UserAccount', userAccountSchema);
const UserPost = mongoose.model('UserPost', userPostSchema);
const UserComment = mongoose.model('UserComment', userCommentSchema);
const Userchat = mongoose.model('UserChat', userChatSchema);
// const sampleUser = new UserAccount({
//   username: 'john_doe',
//   email: 'john.doe@example.com',
//   password_hash: 'hashed_password',
//   profile_info: {
//     first_name: 'John',
//     last_name: 'Doe',
//     bio: 'Software Developer at XYZ Corp.',
//     avatar_url: 'http://example.com/avatar.jpg',
//     created_at: new Date()
//   },
//   followers: [],
//   following: []
// });

// sampleUser.save()
//   .then(user => console.log('User created:', user))
//   .catch(error => console.error('Error creating user:', error));

//   const samplePost = new UserPost({
//   user_id: sampleUser._id,
//   content: 'Hello, world! This is my first post.',
//   media: ['http://example.com/image1.jpg', 'http://example.com/video1.mp4'],
//   created_at: new Date(),
//   likes: [],
//   comments: []
// });

// samplePost.save()
//   .then(post => console.log('Post created:', post))
//   .catch(error => console.error('Error creating post:', error));

//   const sampleComment = new UserComment({
//     post_id: samplePost._id,
//     user_id: sampleUser._id,
//     content: 'Nice post! Looking forward to more updates.',
//     created_at: new Date(),
//     likes: []
//   });
  
//   sampleComment.save()
//     .then(comment => {
//       console.log('Comment created:', comment);
//       // Updating the post to include the comment ID
//       return UserPost.findByIdAndUpdate(samplePost._id, { $push: { comments: comment._id } });
//     })
//     .then(updatedPost => console.log('Post updated with comment:', updatedPost))
//     .catch(error => console.error('Error creating comment:', error));
//     const sampleChat = new UserChat({
//       participants: [sampleUser._id, someOtherUserId], // Assume someOtherUserId is another user's ID
//       messages: [
//         {
//           sender_id: sampleUser._id,
//           content: 'Hey, how are you?',
//           created_at: new Date()
//         },
//         {
//           sender_id: someOtherUserId,
//           content: 'I am good, thanks! How about you?',
//           created_at: new Date()
//         }
//       ]
//     });
    
//     sampleChat.save()
//       .then(chat => console.log('Chat created:', chat))
//       .catch(error => console.error('Error creating chat:', error));
      
