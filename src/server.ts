import { prisma } from './configs/db';
import app from './app';
import { ENV } from './configs/envs';
class Server {
  static async Connection(): Promise<void> {
    try {
      await prisma.$disconnect();
      app.listen(ENV.PORT.PORT || 3000, () => {
        console.log(`App running on port ${ENV.PORT.PORT || 5000}`);
      });
    } catch (error: any) {
      console.error(error);
      await prisma.$disconnect();
      process.exit(1);
    }
  }
}

Server.Connection();

export default new Server();
