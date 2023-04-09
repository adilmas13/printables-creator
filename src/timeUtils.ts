export const timeConversion = (duration: number): string => {
    const portions: Array<string> = [];

    const msInHour = 1000 * 60 * 60;
    const hours = Math.trunc(duration / msInHour);
    if (hours > 0) {
        portions.push(hours + 'h');
        duration = duration - (hours * msInHour);
    }

    const msInMinute = 1000 * 60;
    const minutes = Math.trunc(duration / msInMinute);
    if (minutes > 0) {
        portions.push(minutes + 'm');
        duration = duration - (minutes * msInMinute);
    }

    const seconds = Math.trunc(duration / 1000);
    if (seconds > 0) {
        portions.push(seconds + 's');
    }

    return portions.join(' ');
}

export const measureTime = (block : () => void) : string => {
    const startTime = Date.now();
    block();
    const endTime = Date.now();
    const timeTakenToCompleted = endTime - startTime;
    return timeConversion(timeTakenToCompleted);
}