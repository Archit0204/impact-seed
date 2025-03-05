import GoogleProvider from "next-auth/providers/google";
import client from "@/db/index";

export const NEXT_AUTH = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: any) {
            
            if (user) {
                // Add user ID to the token
                token.id = user.id;
            }

            return token;
        },
        async session({ session, token }: any) {
            // Add the custom claims to the session object
            session.user.id = token.id;

            return session;
        },
        async signIn({user, account, profile}: any) {

            // console.log(user);
            // console.log(account);
            // console.log(profile);

            try{

                const existingUser = await client.user.findUnique({
                    where: {
                        email: user.email
                    }
                });

                if (!existingUser) {

                    await client.user.create({
                        data: {
                            email: user.email,
                            firstName: profile.given_name,
                            lastName: profile?.family_name,
                            avatar: user?.image,
                            oauthId: user.id,
                        }
                    })
                }

                return true;
            }
            catch(err: any) {
                console.log(err.message);
                return false;
            }
        }
    },
    pages: {
        signIn: "/auth/signin",
    },
}