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
        var channel = this.channels.filter((channel) => channel.name === name)[0];
        if(channel){
            return channel.url;
        }
        else{
            return null;
        }
    }
    getChannel(name){
        return this.channels.filter((channel) => channel.name === name)[0];
    }
}

module.exports = {Channel};
