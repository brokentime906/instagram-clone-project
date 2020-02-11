import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";
export default {
  Mutation: {
    requestSecret: async (_, args, { request }) => {
      const { email } = args;
      const loginSecret = generateSecret();
      console.log("loginsecret");
      console.log(loginSecret);
      try {
        console.log(request);
        throw Error();
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch {
        return false;
      }
    }
  }
};
