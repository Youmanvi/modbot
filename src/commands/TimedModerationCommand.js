const ModerationCommand = require('./ModerationCommand');
const util = require('../util');

class TimedModerationCommand extends ModerationCommand {

    static usage = '<@user|id> [<@user|id…>] [<duration>] [<reason>]';

    static timed = true;

    async sendSuccess(target){
        if (this.duration)
            return util.chatSuccess(this.message.channel, target, this.reason, this.constructor.type.done, util.secToTime(this.duration));
        else
            return super.sendSuccess(target);
    }

    /**
     * get the duration of this moderation
     */
    getDuration() {
        const duration = util.timeToSec(this.args.join(' '));
        while (util.isTime(this.args[0])){
            this.args.shift();
        }
        return duration;
    }
}

module.exports = TimedModerationCommand;
