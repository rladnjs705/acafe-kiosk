import { auth } from '$db/auth';
import type { PageServerLoad } from './$types';
 
export const loginWithPassword = (async ({ params }) => {
  console.log(params);
  //if(!params.email || !params.pwd) throw 'Unauthorized';

  //const authenticatingUser = await auth.findOne({'emails.address' : params.email}).toArray();

  //const authenticatingUser = await Meteor.users.findOne({'emails.address': email});
  //console.log(authenticatingUser);
  // if(!authenticatingUser) throw 'UnAuthorized';
  // if(!(authenticatingUser.services != null ? authenticatingUser.services.password : undefined)) throw 'Unauthorized';

  console.log("-----exit");

  return {
      //auth: data
  }
}) satisfies PageServerLoad;

export default loginWithPassword