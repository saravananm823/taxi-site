import 'dotenv/config';
import sequelize from './src/config/db.js';
import Admin from './src/models/Admin.js';

async function resetAdmin() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected');

        // Delete existing admin with username 'saravanan'
        const deleted = await Admin.destroy({
            where: { username: 'saravanan' }
        });
        console.log(`🗑️  Deleted ${deleted} admin(s) with username 'saravanan'`);

        // Create new admin with correct password
        const newAdmin = await Admin.create({
            username: 'saravanan',
            password: '123456'
        });
        console.log('✅ New admin created:', newAdmin.username);
        console.log('Password: 123456');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

resetAdmin();
