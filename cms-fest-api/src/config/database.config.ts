import mongoose from 'mongoose';

// Config
import { environment } from './environment.config';

// Errors
import { handleError } from 'errors';

export interface IConnectDatabase {
  connectTo: 'API';
}

export const connectDatabase = async ({ connectTo }: IConnectDatabase) => {
  try {
    const prefix = connectTo.toUpperCase() as IConnectDatabase['connectTo'];

    const variables = [
      'DATABASE_USER',
      'DATABASE_PASSWORD',
      'DATABASE_HOST',
      'DATABASE_NAME',
    ] as const;

    for (const variable of variables)
      if (!environment[`${prefix}_${variable}`])
        return handleError(`${variable} not found`, 'INTERNAL_SERVER_ERROR');

    const connectionOptions = {
      user: environment[`${prefix}_DATABASE_USER`],
      pass: environment[`${prefix}_DATABASE_PASSWORD`],
      host: environment[`${prefix}_DATABASE_HOST`],
      database: environment[`${prefix}_DATABASE_NAME`],
    };

    const uri = `mongodb+srv://${connectionOptions.user}:${connectionOptions.pass}@${connectionOptions.host}/${connectionOptions.database}?retryWrites=true&w=majority`;
    
    mongoose.connect(uri);

     mongoose.connection.on('connecting', () => {
      console.log(`🔌 Connecting to ${prefix} database...`);
    });

     mongoose.connection.on('connected', () => {
      console.log(`✅ Database ${prefix} connected`);
    });

     mongoose.connection.on('disconnected', () => {
      console.log(`❌ Database ${prefix} disconnected`);
    });

     mongoose.connection.on('error', error => {
      console.error(error);
    });

    return  mongoose.connection.asPromise();
  } catch (error) {
    console.error(error);
  }
};
