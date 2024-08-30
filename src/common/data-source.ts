import { DataSource, DataSourceOptions } from "typeorm";

const config = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1sampai8',
    database: 'nestjs_starter_db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    logging: false,
    synchronize: true, // don't use true ini production
    migrationsRun: true,
    extra: {
        charset: 'utf8',
    },
} as DataSourceOptions;

const datasource = new DataSource(config);
datasource.initialize();
export default datasource;