/**
 * Basic promise-based implementation of sleep.
 *
 * @async
 * @function sleep
 */
var sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms || 1000));

/**
 * Main function. Bruteforces to stdout.
 *
 * @async
 * @function brute
 * @param {string} target - The string to be bruteforced. Defaults to
 * 'Hello World!' if not set.
 */
var brute = async function(target)
{
    target = target || "Hello World!";
    var index = 0;
    var charCode = 32;
    var len = target.length;
    var string = "";

    while(index < len)
    {
        string = string.substring(0, index)
            .concat(String.fromCharCode(charCode++));

        if(string[index] === target[index])
        {
            index++;
            charCode = 32;
        }

        //Does what a carriage return is supposed to do.
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(string);

        await sleep(10);
    }
    process.stdout.write("\n");
    return;
}

/**
 * Parse args and run.
 *
 * @function run
 * @async
 */
var run = async function()
{
    args = process.argv.slice(2);

    if(args.length > 0)
    {
        return await brute(args.reduce((accum, val) => accum + " " + val));
    }
    else
        return await brute()
}

run();
