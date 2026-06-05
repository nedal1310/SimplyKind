import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";
import User from '@/models/User';
import Payment from '@/models/Payment';
import connectDB from '@/db/connectDb';

export const authoptions = NextAuth({
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("SIGNIN CALLBACK HIT");
      const isAllowedToSignIn = true
      if (account.provider == "google") {
        //connect to db
        await connectDB();
        //check if user already exist in database
        // const currentUser= await client.db("users").collection("users").findOne({email:email});
        const currentUser = await User.findOne({ email: user.email });
        console.log(currentUser)
        console.log("USER FROM DB:", currentUser);
        if (!currentUser) {
          const newUser = new User({
            email: user.email,
            name: user.name,
            username: user.email.split("@")[0],
            profilepic: user.image,
          });

          await newUser.save();
        }
        return true
      }
    },
    async session({ session }) {
      await connectDB();

      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.username = dbUser.username;
      } else {
        console.log("User not found in session");
      }

      return session;
    }
  }
})
export { authoptions as GET, authoptions as POST }