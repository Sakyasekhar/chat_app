const users = [];

// Join user to chat
function newUser(id, username,roomname) {
  const user = { id, username,roomname};

  users.push(user);
  
  return user;
}

// Get current user
function getActiveUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function exitRoom(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getIndividualRoomUsers(room) {
    var onlineUsers = []
    var filteredUsers = users.filter(user => user.roomname === room)
    // filteredUsers = JSON.stringify(filteredUsers);
    // console.log(users.filter(user => user.roomname === room));
    filteredUsers.forEach((user) => {onlineUsers.push(user.username)

    }) 

    console.log(onlineUsers);
    return onlineUsers;

}

module.exports = {
  newUser,
  getActiveUser,
  exitRoom,
  getIndividualRoomUsers
};