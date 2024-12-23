import NextAuth from 'next-auth';
import bcrypt from 'bcrypt';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { pool } from '@/app/lib/pool';
import type { User } from '@/app/lib/definitions';
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;
            // 数据库里保存的hash不可逆，这里要通过bcrypt对比password的hash
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (passwordsMatch) return user;
          }
          return null;
        },
      }),
  ],
});
/*
The Credentials provider allows you to handle signing in with arbitrary credentials, such as a username and password, domain, two factor authentication or hardware device (e.g. YubiKey U2F / FIDO).
https://authjs.dev/getting-started/providers/credentials

Although we're using the Credentials provider, it's generally recommended to use alternative providers such as OAuth or email providers. 
See the NextAuth.js docs (https://authjs.dev/getting-started/authentication/oauth) for a full list of options.
*/

async function getUser(email: string): Promise<User | undefined> {
    let conn;
    try {
      conn = await pool.getConnection();
      const user = await conn.query(`SELECT * FROM users WHERE email=(?)`, [email]);
      return user[0];
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    } finally {
      if (conn) conn.release();
    }
}