
class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, channel) {
        var user = { id, name, channel };
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0]
    }
    getUserList(channel) {
        var users = this.users.filter((user) => user.channel === channel);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = { Users };