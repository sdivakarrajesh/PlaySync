class Channel{
    constructor(){
        this.channels = [];
    }
    addChannel(name,url){
        console.log(`creating channel with ${name} ${url}`);
        var channel = {name,url};
        this.channels.push(channel);
        return channel;
    }
    removeChannel(name) {
        var channel = this.getChannel(name);

        if (channel) {
            this.channels = this.channels.filter((channel) => channel.name !== name);
        }

        return channel;
    }
    getChannelVideoUrl(name){
        return this.channels.filter((channel) => channel.name === name)[0].url;
    }
    getChannel(name){
        return this.channels.filter((channel) => channel.name === name)[0];
    }
}

module.exports = {Channel};
