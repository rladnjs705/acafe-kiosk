import { ADMIN } from '$utils/constans';
import { auth } from '$db/auth';
import checkAuth from './checkAuth';

const mutations = {
  async loginWithPassword(_, {email, pwd}) {

    console.log("-----exit");
    //const passwordVerification = await Accounts._checkPassword(authenticatingUser, pwd);
    //if(passwordVerification.error) throw 'Unauthorized';

    //const authToken = await Accounts._generateStampedLoginToken();
    //const hashedToken = await Accounts._hashLoginToken(authToken.token);

    //await Accounts._insertHashedLoginToken(authenticatingUser._id, {hashedToken: hashedToken, when: authToken.when});

    return { authToken: authToken.token, userId: authenticatingUser._id};
  },
}

const queries = {
  async users(_, args, { user }, info) {
    try {
      checkAuth(user, ADMIN);
      const result = await Meteor.users.find();

      return result;
    }
    catch(error) {
      throw error.message;
    }
  },
  me(_, args, {user}, info) {
    console.log(`info: ${user}`)
    let userValue = {
      _id: user._id,
      emails: [
        {address: user.emails[0].address},
      ],
      profile: {
        role: user.profile.role,
      }
    }

    return userValue;
  }
}

const resolvers = {
  Mutation: mutations,
  Query: queries,
}

export default resolvers;