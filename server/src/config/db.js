import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

// Test connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully!');
    } catch (error) {
        console.error('❌ Unable to connect to database:', error);
    }
})();

export default sequelize;
