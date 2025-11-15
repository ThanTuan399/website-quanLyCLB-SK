// File này dùng Sequelize để kết nối với CSDL MySQL
const {Sequelize} = require ('sequelize');

// Khởi tạo một kết nối Sequelize
const sequelize = new Sequelize ('quanlyclb_db', 'root', 'tmt592004', 
    {
        host: 'localhost',
        dialect: 'mysql'
    });

// Hàm để kiểm tra kết nối
const testConnection= async () => 
{
    try 
    {
        await sequelize.authenticate();
        console.log('Kết nối CSDL thành công!');
    }
    catch (error)
    {
        console.error('Không thể kết nối CSDL:', error);
    } 
};

// Xuất (export) sequelize instance để các file khác có thể dùng
module.exports = {sequelize, testConnection};

