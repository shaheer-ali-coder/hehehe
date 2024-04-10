const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs')
const path = require('path')
// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const token = '7019611296:AAH_cmh9orp3Ev3xFlGdRPT7QqW5HwoG9Xc';

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });
function generateReferralCode(length = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let referralCode = '';

  for (let i = 0; i < length; i++) {
      referralCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return referralCode;
}
async function fetchWalletStats(walletAddress) {
  try {
      // Fetch recent transactions for the wallet
      const response = await axios.post('https://api.mainnet-beta.solana.com', {
          jsonrpc: '2.0',
          id: 1,
          method: 'getConfirmedSignaturesForAddress2',
          params: [walletAddress, { limit: 10000 }]
      });
      const transactions = response.data.result;

      // Calculate 10 days ago
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

      // Filter transactions for the past 10 days
      const recentTransactions = transactions.filter(tx => new Date(tx.blockTime) > tenDaysAgo);

      // Calculate total transactions and total SOL transferred
      const totalTransactions = recentTransactions.length;
      const totalSolTransferred = recentTransactions.reduce((acc, tx) => acc + (tx.meta.preBalances[0] - tx.meta.postBalances[0]), 0) / 10 ** 9; // Convert lamports to SOL

      return {
          totalTransactions,
          totalSolTransferred
      };
  } catch (error) {
      console.error('Error fetching wallet stats:', error);
      throw error;
  }
}


function amendJsonFile(fileName, newName , data_ammend) {
  // Read the content of the JSON file
  fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return;
      }

      try {
          // Parse JSON content
          const jsonData = JSON.parse(data);

          // Amend the data with the new name
          jsonData[newName] = data_ammend;

          // Convert JSON back to string
          const updatedData = JSON.stringify(jsonData, null, 2);

          // Rewrite the file with updated content
          fs.writeFile(fileName, updatedData, 'utf8', (err) => {
              if (err) {
                  console.error('Error writing to file:', err);
                  return;
              }
              console.log('File updated successfully.');
          });
      } catch (error) {
          console.error('Error parsing JSON:', error);
      }
  });
}
bot.onText(/\/check (.+)/, (msg, match) => {
  // Extract the wallet address from the message
  const walletAddress = match[1];
  const chatId = msg.chat.id;
  // Now you can do whatever you want with the wallet address, for example, store it
  fetchWalletStats(walletAddress)
    .then(walletStats => {
        console.log("Wallet Stats for the Past 10 Days:");
        console.log("Total Transactions:", walletStats.totalTransactions);
        console.log("Total SOL Transferred:", walletStats.totalSolTransferred, "SOL");
        bot.sendMessage(chatId,  `Wallet Stats for the Past 10 days :\n\n <b>Total Transactions:</b> ${walletStats.totalTransactions}\n <b>Total SOL Transferred:</b> ${walletStats.totalSolTransferred} SOL`)
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
// Listen for the /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const keyboard_1 = {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '❓How to use Bot', callback_data: 'how' },
            ],
            [
              { text: '🙎‍♂️Refferal System', callback_data: 'refferal' },
              
            ],
            [
                { text: '🤑Buy Pro Version', callback_data: 'pro' },
                
              ],
              [
                { text: '👉Check Wallet on Solana', callback_data: 'check' },
                
              ],
          ],
        },
      };
    // Send a message with the menu
    bot.sendMessage(chatId, 'Choose an option:', { parse_mode: "HTML", ...keyboard_1 });
});

// Listen for callback queries
bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;
    const userName = callbackQuery.from.username;
    // Respond to each option
    switch (data) {
        case 'how':
            const imageCaption = `We have made 3 Knowledge Hub videos for you:\n<a href="https://youtu.be/2aGDhsMFmx4">What is copytrade on Solana</a>\n<a href="https://youtu.be/zkGpRFkIzwI">How to use bot</a>\n<a href="https://youtu.be/dXjKcTQ0Ils">How to analyze and set-up copytrade</a>\nAs well to that read our docs (available on 12 languages):\n<a href="https://linktr.ee/Whale_finders">👀Documentation</a>`
            const imageFilePath = './pic.jpg'; // Update with your local file path

            // Check if the file exists
            fs.access(imageFilePath, fs.constants.F_OK, (err) => {
                if (err) {
                    console.error('File does not exist');
                    bot.sendMessage(chatId, 'Error: File not found');
                    return;
                }

                // Send the photo
                bot.sendPhoto(chatId, fs.readFileSync(imageFilePath), {
                    caption: imageCaption,
                    parse_mode: "HTML"
                }).catch((err) => {
                    console.error('Error sending photo:', err);
                    bot.sendMessage(chatId, 'Error sending photo');
                });
            });
            break;
        case 'check':
            const message = `
            🤖To get wallet stats for 10 days type:\n/check Wallet\n🆓Free version is limited to 3 checks a day. To use it you need to be subscribed to @Whale_finders_blog_eng.\n🌟To get unlimited checks and lists of wallets from contract checks get PRO\n(Auto paybot) @Whale_pay_bot\n(Manager 6am-6pm GMT) @zimmaman`
            bot.sendMessage(chatId, message);
            break;
            case 'refferal':
    console.log("referrals clicked");
    const keyboard_1 = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Claim Money', callback_data: 'claim' },
                ],
            ],
        },
    };

    const filePath___ = path.join(__dirname, './data.json');
    console.log("reading file...");
    fs.readFile(filePath___, 'utf8', (err, data) => {
        console.log("file read!");
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        try {
            let jsonData = JSON.parse(data);
            
            // Find user entry
            const userEntry = jsonData[userName];
            
            if (userEntry) {
                console.log("user found");
                const code = Object.keys(userEntry)[0]; // Extract referral code
                console.log(`User with username '${userName}' exists.`);
                bot.sendMessage(chatId, `
                Get 15% from people who buy from your referral code\n🤑Paying out on mondays\nYour referral code:${code}\nShare it with your audience.\n\nPeople used link: ${userEntry[code].buys}\nYour referral balance: ${userEntry[code].money}$\nWhen a person uses your link, we automatically save their ID under your reflink. As soon as the user pays using the bot or through the manager, you get the balance added.
                `, { parse_mode: "HTML", ...keyboard_1 });

            } else {
                console.log("user not found , generating code!");
                const code = generateReferralCode();
                console.log(`User with username '${userName}' does not exist.`);
                bot.sendMessage(chatId, `
                Get 15% from people who buy from your referral code\n🤑Paying out on mondays\nYour referral code:${code}\nShare it with your audience.\n\nPeople used link: 0\nBuys: 0\nYour referral balance: 0.0$\nAlready claimed money: 0$\nWhen a person uses your link, we automatically save their ID under your reflink. As soon as the user pays using the bot or through the manager, you get the balance added.\nWrite @zimmaman to get personal assistance
                `, { parse_mode: "HTML", ...keyboard_1 });

                // Update data with new user entry
                jsonData[userName] = {
                    [code]: {
                        'username': userName,
                        'money': 0,
                        'buys': 0,
                        'code': code
                    }
                };
                fs.writeFile(filePath___, JSON.stringify(jsonData), (err) => {
                    if (err) {
                        console.error('Error writing to file:', err);
                        return;
                    }
                    console.log('Data written to file.');
                });
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });

    break;

        case 'claim':
            bot.sendMessage(chatId,"You don't have money to claim yet")
        case 'pro':
            bot.sendMessage(chatId, `
            🌟In PRO version:🌟\n1️⃣ We drop ~200 profitable wallets a day to private group\n2️⃣ No such limits on wallet checks.\n3️⃣Get files of wallets from checked tokens(in group)\nEach file have all wallets which were trading with next data: wallet,amount of buys, amount of sells, buy sum, sell sum, xmade(sell sum/buy sum)\n💰Cost is just $59 a month\n(Auto paybot) @whale_pay_bot\n(Manager 6am-6pm GMT) @zimmaman
            `);
            break;
    }
});
