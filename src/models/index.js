const User = require('./user.model');
const Club = require('./club.model');
const ClubMember = require('./clubMember.model');

// 1. Quan hệ giữa User và Club (thông qua ClubMember - N:N)
User.belongsToMany(Club, { through: ClubMember, foreignKey: 'userId', otherKey: 'clubId', as: 'clubs' });
Club.belongsToMany(User, { through: ClubMember, foreignKey: 'clubId', otherKey: 'userId', as: 'members' });

// 2. Quan hệ Chủ nhiệm (User làm chủ nhiệm Club - 1:N)
User.hasMany(Club, { foreignKey: 'chuNhiemId', as: 'managedClubs' });
Club.belongsTo(User, { foreignKey: 'chuNhiemId', as: 'manager' });

// 3. Định nghĩa thêm quan hệ trực tiếp với bảng trung gian (để dễ query)
Club.hasMany(ClubMember, { foreignKey: 'clubId' });
ClubMember.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Club,
  ClubMember
};