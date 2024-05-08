const TelegramBot = require("node-telegram-bot-api");
const {
  Keypair,
  Connection,
  Transaction,
  SystemProgram,
  PublicKey,
} = require("@solana/web3.js");
const {
  sendAndConfirmTransaction
} = require("@solana/web3.js");
const messages = {}; // Object to store message data
const filePath = "./data.json";
const fs = require("fs");
// const { Keypair } = require("@solana/web3.js");
// const { Connection, PublicKey } = require("@solana/web3.js");
let copyTrading = [];
// Todo
// 7. In 'referral' callback code to check for balance for referral
// 8. Buttons for 'setting' callback
// 9. 'bridge' callback
// 10. 'solana' callback addition of buttons
// 11. 'ethereum' callback addtion of buttons
// 12. 'refresh' callback should be coded to refresh the message
// 13. Implement buyToken()
// 14. Implement 'add_copytrade'
// 15 . Implement sellTrade() , getDCA() , getLimitOrder(), getPosition()

// The keyboard :

// const keyboard_ = {
//     reply_markup: {
//       inline_keyboard: [
//         [
//           { text: '', callback_data: '' },
//           { text: '', callback_data: '' },
//         ],
//
//       ],
//     },
//   }

const optionStates = {
  "CopySell : Yes": false,
  "CopySell : No": false,
};

async function executeBuyTrade(address, targetWalletAddress, amount) {
  
}

async function getPositionOfTrade(walletAddress) {
  
}

// Function to execute a sell trade on the target wallet
async function executeSellTrade(address, targetWalletAddress, amount) {
  
}

async function copyTrade(){
  
}

async function getTransactions(address) {
  
}

async function calculateProfit(transactions) {
  
}
async function performCopyTrading() {
  
}
// Function to toggle the state of an option
function toggleOption(chatId, option) {
  optionStates[option] = !optionStates[option];
  return optionStates[option] ? "CopySell : Yes" : "CopySell : No";
}
async function sellTokens(chatId, recipientAddress, privateKeyBase64, amount) {
  
}
async function buyTokens(chatId , sellerPublicKey, buyerPrivateKeyBase64, amount) {
  
}

let startCommandTriggered = false; // Flag to track if the /start command has been triggered
function generateWalletAddress() {
  
}

const rpcEndpoint = "https://api.mainnet-beta.solana.com";

async function getSolanaBalance(walletAddress) {
  // Initialize connection to the Solana network
  

}
function getRefCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // You can modify this as per your requirements
  const codeLength = 8; // Length of the referral code
  let referralCode = "";

  for (let i = 0; i < codeLength; i++) {
    referralCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return referralCode;
}
async function getPositions(chatId, publicKey) {
  
}

async function transfer(chatId, senderPrivateKey, recipientAddress, amount) {
  
}
// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const token = "6805897311:AAHk_XGVodr4NEJowdwfHjA0_V4YF0YAINs";
let state = "idle";
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start(?: (.*))?/, async (msg) => {
  startCommandTriggered = true; // Set the flag to true when /start command is triggered
  console.log("msg recieved");
  let match = msg.split(',')
  const chatId = msg.chat.id;
  const referralCode = match[1] || ""; // Extract referral code from the match or use an empty string if not provided
  console.log(referralCode);
  // Process the referral code (e.g., store it in a database)
  // console.log(`Referral code ${referralCode} received from user ${msg.from.id}`);
  fs.readFile("./ref.json", "utf8", async (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const jsonData___ = JSON.parse(data);
    let referralCodeMatched = false;
    console.log(jsonData___);
    // Check if referral code matches any entry in the JSON data
    for (const userId in jsonData___) {
      const userData = jsonData___[userId];
      for (const uniqueId in userData) {
        const user = userData[uniqueId];
        if (user && user.code === referralCode) {
          if (!user.hasOwnProperty("buys")) {
            user.buys = 1;
          } else {
            user.buys += 1;
          }
          user.money += 0.1;
          referralCodeMatched = true;
          break;
        }
      }
      if (referralCodeMatched) {
        break;
      }
    }

    // Rewrite the updated JSON data to the file
    if (referralCodeMatched) {
      fs.writeFile(
        "./data.json",
        JSON.stringify(jsonData___, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return;
          }
          console.log("Data updated successfully!");
        }
      );
    }
    const chatId = msg.chat.id;
    const username = msg.from.username;
    const keyboard_1 = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Buy", callback_data: "buy" },
            { text: "Sell", callback_data: "sell" },
            { text: "Positions", callback_data: "positions" },
          ],
          [
            { text: "CopyTrade", callback_data: "copytrade" },
            { text: "LP Sniper 🔜", callback_data: "lp_sniper" },
            { text: "Check Wallet", callback_data: "check_wallet" },
          ],
          [
            { text: "Referrals", callback_data: "referrals" },
            { text: "Settings", callback_data: "setting" },
          ],
          [
            { text: "Withdrawl", callback_data: "withdraw" },
            { text: "Help", callback_data: "help" },
          ],
        ],
      },
    };
    let jsonData = {}; // Declared outside the try-catch block
    try {
      const data = fs.readFileSync(filePath, "utf8"); // Read file as text
      try {
        jsonData = data ? JSON.parse(data) : {}; // Parse JSON data if not empty, otherwise assign an empty object
      } catch (error) {
        console.error("Error parsing JSON data:", error);
        jsonData = {}; // Assign an empty object in case of parsing error
      }

      if (jsonData.hasOwnProperty(username)) {
        let publicKey = jsonData[username].publicKey;
        const balance_ = await getSolanaBalance(publicKey);
        if (balance_ !== null) {
          console.log("Balance:", balance_);
          let messageText = `Welcome to Sidemix\n\nSolana's fastest bot to trade any coin (SPL token)\nYou currently have no SOL balance. To get started with trading, send some SOL to your sidemix wallet address:\n${publicKey}\nBalance: ${balance_}SOL\nTo purchase a token, simply enter its address or share the Birdeye link of the coin.\nFor more information about your wallet and to access your private key, click the check wallet button below. While Sidemix ensures the security of user funds, exposing your private key can compromise the safety of your funds.`;
          bot
            .sendMessage(
              chatId,
              `🌟 Welcome to the Silver Sniper Bot! 🚀

Embark on your trading journey with the fastest and most reliable trading bot in the galaxy, powered by the native Silver Surfer Solana token. Experience lightning-fast transactions that let you beat anyone to the trade, ensuring you never miss a golden opportunity.
              
🔗 Dive into the action and learn more at www.silversolana.surf.
              
🌌 Join us and dominate the markets with unmatched speed and efficiency! 🏄‍♂️`,
              { parse_mode: "HTML", ...keyboard_1 }
            )
            .then((sentMessage) => {
              // Store the message data with its unique identifier (message ID)
              messages[sentMessage.message_id] = {
                text: messageText,
                options: keyboard_1.reply_markup.inline_keyboard,
              };
            });
        } else {
          console.log("Failed to fetch balance.");
          bot.sendMessage(chatId, "Bot is receiving Network Connection issue");
        }
      } else {
        let publicKey;
        let privateKey;
        try {
          wallet = await generateWalletAddress();
          publicKey = wallet.publicKey;
          privateKey = wallet.privateKey;
          console.log(publicKey);
        } catch (error) {
          console.error("Error generating wallet address:", error);
          bot.sendMessage(chatId, "Error generating wallet address");
          return; // Exit function if wallet address generation fails
        }

        const balance = await getSolanaBalance(publicKey);
        if (balance !== null) {
          console.log("Balance:", balance);
          let messageText = `Welcome to Sidemix\n\nSolana's fastest bot to trade any coin (SPL token)\nYou currently have no SOL balance. To get started with trading, send some SOL to your sidemix wallet address:\n${publicKey}\nBalance: ${balance}SOL\nTo purchase a token, simply enter its address or share the Birdeye link of the coin.\nFor more information about your wallet and to access your private key, click the check wallet button below. While Sidemix ensures the security of user funds, exposing your private key can compromise the safety of your funds.`;
          bot
            .sendMessage(
              chatId,
              `🌟 Welcome to the Silver Sniper Bot! 🚀

Embark on your trading journey with the fastest and most reliable trading bot in the galaxy, powered by the native Silver Surfer Solana token. Experience lightning-fast transactions that let you beat anyone to the trade, ensuring you never miss a golden opportunity.
              
🔗 Dive into the action and learn more at www.silversolana.surf.
              
🌌 Join us and dominate the markets with unmatched speed and efficiency! 🏄‍♂️`,
              { parse_mode: "HTML", ...keyboard_1 }
            )
            .then((sentMessage) => {
              // Store the message data with its unique identifier (message ID)
              messages[sentMessage.message_id] = {
                text: messageText,
                options: keyboard_1.reply_markup.inline_keyboard,
              };
            });
        } else {
          console.log("Failed to fetch balance.");
          bot.sendMessage(chatId, "Bot is receiving Network Connection issue");
        }
        jsonData[username] = {
          publicKey: publicKey,
          privateKey: privateKey,
        }; // Corrected assignment
        fs.writeFileSync(filePath, JSON.stringify(jsonData)); // Corrected writing to file
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
bot.onText(/\/checkWallet/, async (msg) => {
  startCommandTriggered = true; // Set the flag to true when /start command is triggered
  const chatId = msg.chat.id;
  const username = msg.from.username;
  state = "wallet_";
  bot.sendMessage(chatId, `Enter the Solana address to check`);
});
// Handle callback queries
bot.on("callback_query", (callbackQuery) => {
  // const option = callbackQuery.data;
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;
  const message = messages[callbackQuery.message.message_id];
  const username = msg.from.username;
  if (action == "/start") {
    startCommandTriggered = false;
    return;
  }
  // Perform different actions based on the callback data
  switch (action) {
    case "add_copytrade":
      if (message) {
        const optionClicked = callbackQuery.data;
        console.log("Whole message with options:", message);
        console.log("Option clicked:", optionClicked);

        // Find the text of the "target Wallet" option
        const targetOption = message.options.find((row) =>
          row.some((option) => option.callback_data === "target")
        );

        if (targetOption && targetOption.text === "target Wallet") {
          console.log(
            "Option 'target Wallet' text matches. Sending message..."
          );
          // Send message since the text of the option matches "target Wallet"
          // bot.sendMessage(callbackQuery.message.chat.id, "Sending message because 'target Wallet' text matches.");
          bot.sendMessage(chatId, "please enter the wallet...");
        } else {
          const optionsObject = {
            tag: message.options[0][0].text,
            target: message.options[1][0].text,
            buy_percentage: message.options[2][0].text,
            copy_sell: message.options[2][1].text,
            buy_gas: message.options[3][0].text,
            sell_gas: message.options[3][1].text,
            slippage: message.options[4][0].text,
          };
          console.log(
            "Option text doesn't match 'target Wallet'. Sending message..."
          );
          // Send message since option text doesn't match "target Wallet"
          // bot.sendMessage(callbackQuery.message.chat.id, "Hello nigger.");
          bot.sendMessage(chatId, "Congrats! CopyTrade added successfully!");
          fs.readFile("data.json", "utf8", (err, data) => {
            if (err) {
              console.error("Error reading file:", err);
              return;
            }

            // Parse the JSON data
            const userData = JSON.parse(data);

            // Iterate through each object in the JSON data
            for (const user in userData) {
              // Check if the username matches
              if (user === username) {
                // Return the private key of the user
                copyTrading.push([userData[user].privateKey, messageText]);
              }
            }

            // Return null if the username is not found
            return null;
          });
          fs.readFile("./copytrade.json", "utf8", (err, data) => {
            if (err) {
              console.error("Error reading file:", err);
              return;
            }

            let trades = [];
            if (data) {
              try {
                trades = JSON.parse(data);
              } catch (error) {
                console.error("Error parsing JSON data:", error);
              }
            }

            if (Array.isArray(trades)) {
              trades.forEach((trade) => {
                if (trade.data[username] && trade.data[username]) {
                  // bot.sendMessage(chatId, "Selling the Trade...");
                  trade.data[username][optionsObject.tag] = optionsObject;
                } else {
                  // bot.sendMessage(
                  // chatId,
                  // `You don't have any token yet! Start trading in the Buy Menu`
                  // );
                  trade.data[username][optionsObject.tag] = optionsObject;
                }
              });
            }
            fs.writeFileSync(
              "./copytrade.json",
              JSON.stringify(trades, null, 2)
            );
          });
        }
      } else {
        console.log("Message data not found.");
      }

      // if (action == "target Wallet") {
      break;
    //   bot.sendMessage(chatId, "please enter the wallet...");
    // } else {
    //   bot.sendMessage(chatId, "Congrats! CopyTrade added successfully!");
    // }
    case "buy":
      // Handle the 'Buy' option
      bot.sendMessage(chatId, "Enter a token symbol or address to buy");
      state = "buy";
      break;
    case "sell":
      // Handle the 'Sell' option
      fs.readFile("./trade.json", "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }

        let trades = [];
        if (data) {
          try {
            trades = JSON.parse(data);
          } catch (error) {
            console.error("Error parsing JSON data:", error);
          }
        }

        if (Array.isArray(trades)) {
          trades.forEach((trade) => {
            if (trade.data[username] && trade.data[username]["token"]) {
              // bot.sendMessage(chatId, "Selling the Trade...");
              bot.sendMessage(
                chatId,
                "Enter the address where you want to sell it"
              );
              state = "sell";
              // sellTrade();
            } else {
              bot.sendMessage(
                chatId,
                `You don't have any token yet! Start trading in the Buy Menu`
              );
            }
          });
        } else {
          bot.sendMessage(
            chatId,
            "You don't have any Token Yet! Start Trading in the Buy Menu"
          );
        }
      });
      break;
    case "positions":
      // Handle the 'Positions' option
      fs.readFile("trade.json", "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }

        // Parse the JSON data
        let trades = {};
        try {
          trades = JSON.parse(data);
        } catch (error) {
          console.error("Error parsing JSON data:", error);
          bot.sendMessage(
            chatId,
            "Error reading your positions. Please try again later."
          );
          return;
        }

        // Check if trades is empty or null
        if (Object.keys(trades).length === 0) {
          bot.sendMessage(
            chatId,
            "You do not have any tokens yet! Start trading in the Buy menu."
          );
          return;
        }

        // Loop through each object in the JSON array
        Object.values(trades).forEach((trade) => {
          // Check if the 'token' property of the user is true
          if (
            trade.data &&
            trade.data[username] &&
            trade.data[username]["token"]
          ) {
            bot.sendMessage("Getting Position...");
            // getPosition();
            let privateKey = "";
            fs.readFile("./data.json", "utf8", (err, data) => {
              if (err) {
                console.error("Error reading file:", err);
                return;
              }

              let trades_ = [];
              if (data) {
                try {
                  trades = JSON.parse(data);
                } catch (error) {
                  console.error("Error parsing JSON data:", error);
                }
              }

              if (Array.isArray(trades_)) {
                trades_.forEach((trade) => {
                  if (trade.data[username] && trade.data[username]) {
                    // bot.sendMessage(chatId, "Selling the Trade...");
                    privateKey = trade.data[username]["publicKey"];
                    getPositions(chatId, privateKey);
                  }
                });
              }
            });
          } else {
            bot.sendMessage(
              chatId,
              "You don't have any Token Yet! Start Trading in the Buy Menu"
            );
          }
        });
      });
      break;

    case "limit_orders":
      // Handle the 'Limit Orders' option
      fs.readFile("trade.json", "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }

        // Parse the JSON data
        let trades = {};
        try {
          trades = JSON.parse(data);
        } catch (error) {
          console.error("Error parsing JSON data:", error);
          bot.sendMessage(
            chatId,
            "Error reading your limit orders. Please try again later."
          );
          return;
        }

        // Check if trades is empty or null
        if (Object.keys(trades).length === 0) {
          bot.sendMessage(
            chatId,
            "You have no active limit orders. Create a limit order from the Buy/Sell menu."
          );
          return;
        }

        // Loop through each object in the JSON array
        Object.values(trades).forEach((trade) => {
          // Check if the 'token' property of the user is true
          if (
            trade.data &&
            trade.data[username] &&
            trade.data[username]["token"]
          ) {
            bot.sendMessage("Yet to get the api key....");
            // getLimitOrder();
          }
        });
      });
      break;

    case "dca_order":
      // Handle the 'DCA Orders' option
      fs.readFile("trade.json", "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }

        // Parse the JSON data
        let trades = {};
        try {
          trades = JSON.parse(data);
        } catch (error) {
          console.error("Error parsing JSON data:", error);
          bot.sendMessage(
            chatId,
            "Error reading your DCA orders. Please try again later."
          );
          return;
        }

        // Check if trades is empty or null
        if (Object.keys(trades).length === 0) {
          bot.sendMessage(
            chatId,
            "You have no active DCA orders. Create a DCA order from the Buy/Sell menu."
          );
          return;
        }

        // Loop through each object in the JSON array
        Object.values(trades).forEach((trade) => {
          // Check if the 'token' property of the user is true
          if (
            trade.data &&
            trade.data[username] &&
            trade.data[username]["token"]
          ) {
            bot.sendMessage("Yet to get the api key");
            // getDCA();
          }
        });
      });
      break;
    case "copytrade":
      if (callbackQuery.data != "/start") {
        const keyboard = {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "New", callback_data: "_copytrade" },
                { text: "Pause All", callback_data: "pause_all" },
              ],
            ],
          },
        };
        bot.sendMessage(
          chatId,
          `Copy Trade\n\nCopy Trade allows you to copy the buys and sells of any target wallet. \n🟢 Indicates a copy trade setup is active.\n🟠 Indicates a copy trade setup is paused.\nYou do not have any copy trades setup yet. Click on the New button to create one!`,
          { parse_mode: "HTML", ...keyboard }
        );
        break;
      }
    case "_copytrade":
      if (callbackQuery.data != "/start" || startCommandTriggered == true) {
        const keyboard_1 = {
          reply_markup: {
            inline_keyboard: [
              [{ text: "tag", callback_data: "tag" }],
              [{ text: "target Wallet", callback_data: "target" }],
              [
                {
                  text: "Buy Percentage : 100%",
                  callback_data: "buy_percentage",
                },
                { text: "CopySell : Yes", callback_data: "copy_sell" },
              ],
              [
                { text: "Buy Gas : 0.0015 SOL", callback_data: "buy_gas" },
                { text: "Sell Gas : 0.0015 SOL", callback_data: "sell_gas" },
              ],
              [{ text: "Slippage : 15%", callback_data: "slippage" }],
              [{ text: "add", callback_data: "add_copytrade" }],
            ],
          },
        };
        let messageText = `To setup a new Copy Trade:\n- Assign a unique name or “tag” to your target wallet, to make it easier to identify.\n- Enter the target wallet address to copy trade.\n- Enter the percentage of the target's buy amount to copy trade with, or enter a specific SOL amount to always use.\n- Toggle on Copy Sells to copy the sells of the target wallet.\n- Click “Add” to create and activate the Copy Trade.\nTo manage your Copy Trade:\n- Click the “Active” button to “Pause” the Copy Trade.\n- Delete a Copy Trade by clicking the “Delete” button.`;
        bot
          .sendMessage(
            chatId,
            `To setup a new Copy Trade:\n- Assign a unique name or “tag” to your target wallet, to make it easier to identify.\n- Enter the target wallet address to copy trade.\n- Enter the percentage of the target's buy amount to copy trade with, or enter a specific SOL amount to always use.\n- Toggle on Copy Sells to copy the sells of the target wallet.\n- Click “Add” to create and activate the Copy Trade.\nTo manage your Copy Trade:\n- Click the “Active” button to “Pause” the Copy Trade.\n- Delete a Copy Trade by clicking the “Delete” button.`,
            { parse_mode: "HTML", ...keyboard_1 }
          )
          .then((sentMessage) => {
            // Store the message data with its unique identifier (message ID)
            messages[sentMessage.message_id] = {
              text: messageText,
              options: keyboard_1.reply_markup.inline_keyboard,
            };
          });
      }
      break;

    case "buy_gas":
      state = "buy_gas";
      bot.sendMessage(
        chatId,
        "Enter the priority fee to pay for buy trades. E.g 0.01 for 0.01 SOL"
      );
      break;
    case "sell_gas":
      state = "sell_gas";
      bot.sendMessage(
        chatId,
        `Enter the priority fee to pay for sell trades. E.g 0.01 for 0.01 SOL`
      );
      break;
    case "slippage":
      state = "slippage";
      bot.sendMessage(chatId, `Enter slippage % to use on copy trades`);
      break;
    case "buy_percentage":
      bot.sendMessage(
        chatId,
        `Enter the percentage of the target's buy amount to copy trade with. E.g. with 50%, if the target buys with 1 SOL, you will buy with 0.5 SOL. If you want to buy with a fixed sol amount instead, enter a number. E.g. 0.1 SOL will buy with 0.1 SOL regardless of the target's buy amount.`
      );
      state = "buy_percentage";
      break;
    case "copy_sell":
      const keyboard_1 = messages[callbackQuery.message.message_id].options;
      const newText = toggleOption(action);

      // Clone the original keyboard markup and update the text for the 'copy_sell' option
      const newKeyboard = {
        inline_keyboard: keyboard_1.map((row) => {
          return row.map((option) => {
            // Check if this is the option you want to change
            if (option.callback_data === "copy_sell") {
              // Compare using '===' for strict equality
              // Change the text for this option
              return { ...option, text: newText };
            }
            // Keep the rest of the options unchanged
            return option;
          });
        }),
      };

      // Edit the message with the updated inline keyboard
      bot.editMessageText(
        `To setup a new Copy Trade:\n- Assign a unique name or “tag” to your target wallet, to make it easier to identify.\n- Enter the target wallet address to copy trade.\n- Enter the percentage of the target's buy amount to copy trade with, or enter a specific SOL amount to always use.\n- Toggle on Copy Sells to copy the sells of the target wallet.\n- Click “Add” to create and activate the Copy Trade.\nTo manage your Copy Trade:\n- Click the “Active” button to “Pause” the Copy Trade.\n- Delete a Copy Trade by clicking the “Delete” button.`,
        {
          chat_id: callbackQuery.message.chat.id,
          message_id: callbackQuery.message.message_id,
          reply_markup: {
            inline_keyboard: newKeyboard.inline_keyboard,
          },
        }
      );
      break;
    case "tag":
      bot.sendMessage(chatId, `Enter a Custom name for this CopyTrade`);
      state = "tag";
      break;
    case "target":
      bot.sendMessage(chatId, `Enter the target wallet address to copy trade`);
      state = "target";
      break;

    case "pause_all":
      pause_all();
      break;
    case "lp_sniper":
      bot.sendMessage(
        chatId,
        `Sniper just released in early access, and is available for selected users.\nTo get access before general release, read our tweet about it: https://twitter.com/TrojanOnSolana/status/1764719443568136627`
      );
      break;
    case "check_wallet":
      bot.sendMessage(chatId, `Enter the Solana address to check`);
      state = "wallet_";
      break;
    case "new_pairs":
      bot.sendMessage(
        chatId,
        `📈 OMNI | Omni Network (8m 38s ago)
            6bgsD3NjS3Wh8w1RH6NYcTCGD2FT2XKDknJmQDfsYtxo
            Renounced: ❌ | Not Rugged ✅
            Market Cap: $16.09K
            Liquidity: $27.06K | Locked: 0%
            LP: 84.07% | Creator: 100%
            Top 5: 0% | Top 20: 0%
            🟢 LIVE Quick Buy: Achilles | Odysseus | Menelaus | Diomedes | Paris | Helenus | Hector
            
            📈 PIK | PIK PIK (5m 52s ago)
            4pUCq18F6pJgwCAfS9EttuqA5GkUUB87Z78Gk4i6poms
            Renounced: ✅ | Rugged ‼️
            Market Cap: $5.796
            Liquidity: $7.68 | Locked: 0%
            LP: 66.24% | Creator: 70%
            Top 5: 7.6% | Top 20: 29.6%
            ⚠️ LIVE Quick Buy: Achilles | Odysseus | Menelaus | Diomedes | Paris | Helenus | Hector
            
            📈 IRANWAR | Iran War Token (5m 29s ago)
            8BBB6fcR5fyZkm8FpqTVZRAGvCvsM2qURWVddwoSG9sd
            Renounced: ✅ | Not Rugged ✅
            Market Cap: $4.55K
            Liquidity: $3.05K | Locked: 0%
            LP: 33.46% | Creator: 0%
            Top 5: 5.47% | Top 20: 20%
            🟢 LIVE Quick Buy: Achilles | Odysseus | Menelaus | Diomedes | Paris | Helenus | Hector
            
            📈 PIK | PIK PIK  (5m 26s ago)
            FQYDF6hdDM7e83VsFKisN2cYxp5gDYGQnHADZtdfKxnj
            Renounced: ✅ | Rugged ‼️
            Market Cap: $1.45
            Liquidity: $0.00005155 | Locked: 0%
            LP: 0% | Creator: 100%
            Top 5: 0% | Top 20: 0%
            ⚠️ LIVE Quick Buy: Achilles | Odysseus | Menelaus | Diomedes | Paris | Helenus | Hector
            
            📈 BOOB | Boob Coin (5m 11s ago)
            BtQiU9atUj1KEm3krWZtaxNSN6poy22KPVsZh6ahQBKu
            Renounced: ✅ | Not Rugged ✅
            Market Cap: $1.34K
            Liquidity: $2.27K | Locked: 0%
            LP: 84.85% | Creator: 51.85%
            Top 5: 0% | Top 20: 0%
            🟢 LIVE Quick Buy: Achilles | Odysseus | Menelaus | Diomedes | Paris | Helenus | Hector`
      );
      break;
    case "claim":
      let amount__ = "";
      let publicKey = "";
      fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
          console.error("Error reading data.json:", err);
          return;
        }

        try {
          // Parse the JSON data
          const jsonData = JSON.parse(data);

          // Get the list of usernames from the JSON data
          const usernamesToCheck = Object.keys(jsonData);

          // Function to check if a username exists and store its publicKey
          function checkUsername(username) {
            if (jsonData.hasOwnProperty(username)) {
              console.log(`Username '${username}' exists.`);
              publicKey = jsonData[username].publicKey;
              console.log(
                `Public key of '${username}': ${publicKeyOfUsername}`
              );
            } else {
              console.log(`Username '${username}' does not exist.`);
            }
          }

          // Example: Check if "Shaheer_ali" exists
          // const usernameToFind = "Shaheer_ali";
          checkUsername(username);

          // You can access publicKeyOfUsername here or anywhere else in the code
          // For example:
          // console.log(publicKeyOfUsername);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      });
      const filePath__ = path.join(__dirname, "./ref.json");
      console.log("reading file...");
      fs.readFile(filePath__, "utf8", (err, data) => {
        console.log("file read!");
        if (err) {
          console.error("Error reading file:", err);
          return;
        }

        let jsonData = JSON.parse(data);

        // Find user entry
        const userEntry = jsonData[username];

        if (userEntry) {
          const code = Object.keys(userEntry)[0]; // Extract referral code
          amount__ = userEntry[code].money;
        }
      });
      transfer(
        chatId,
        publicKey,
        "44de60ab948bb40a0d5bc1931125ad926b02da0ae369600703dcaca005f4bcb80ef14d98679391c771ef015761c88b80562c65de3f1b60516cd4157c67bf9e58",
        amount__
      );
      break;
    case "referrals":
      let ref_code = getRefCode();
      const filePath___ = path.join(__dirname, "./ref.json");
      console.log("reading file...");
      fs.readFile(filePath___, "utf8", (err, data) => {
        console.log("file read!");
        if (err) {
          console.error("Error reading file:", err);
          return;
        }

        try {
          let jsonData = JSON.parse(data);

          // Find user entry
          const userEntry = jsonData[username];

          if (userEntry) {
            const code = Object.keys(userEntry)[0]; // Extract referral code
            const keyboard_1 = {
              reply_markup: {
                inline_keyboard: [
                  [{ text: "Claim Money", callback_data: "claim" }],
                ],
              },
            };
            bot.sendMessage(
              chatId,
              `
                      Your Referral:
                      People used link: ${userEntry[code].buys}\nYour referral balance: ${userEntry[code].money}
                      
                      We've established a tiered referral system, ensuring that as more individuals come onboard, rewards extend through five different layers of users. This structure not only benefits community growth but also significantly increases the percentage share of fees for everyone.
                      
                      Stay tuned for more details on how we'll reward active users and happy trading!
                      Your Referral Code : ${code}
                      `,
              { parse_mode: "HTML", ...keyboard_1 }
            );
          } else {
            bot.sendMessage(
              chatId,
              `
                      Your Referral:
                      People used link: 0 \nYour referral balance: 0
                      
                      We've established a tiered referral system, ensuring that as more individuals come onboard, rewards extend through five different layers of users. This structure not only benefits community growth but also significantly increases the percentage share of fees for everyone.
                      
                      Stay tuned for more details on how we'll reward active users and happy trading!
                      Your Referral Code : ${ref_code}
                      `
            );
            // Update data with new user entry
            jsonData[username] = {
              [code]: {
                username: username,
                money: 0,
                buys: 0,
                code: code,
              },
            };
            fs.writeFile(filePath___, JSON.stringify(jsonData), (err) => {
              if (err) {
                console.error("Error writing to file:", err);
                return;
              }
              console.log("Data written to file.");
            });
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      });

      break;

    case "buy_Setting":
      const keyboard_option = {
        reply_markup: {
          inline_keyboard: [
            [{ text: "-Buy Amount-", callback_data: "dummy" }],
            [
              { text: "0.5 SOL ✏", callback_data: "amount_1" },
              { text: "1 SOL ✏", callback_data: "amount_2" },
              { text: "3 sol ✏", callback_data: "amount_3" },
            ],
            [
              { text: "5 SOL ✏", callback_data: "amount_4" },
              { text: "10 SOL ✏", callback_data: "amount_5" },
            ],
            [{ text: "Buy Slippage : 15% ✏", callback_data: "buy_slippage" }],
          ],
        },
      };
      bot.sendMessage(
        chatId,
        `Buy Amounts:\nClick any button under Buy Amounts to set your own custom SOL amounts. These SOL amounts will be available as options in your buy menu.\nBuy Slippage:\nSet the preset slippage option for your buys. Changing this slippage value will automatically apply to your next buys.`,
        { parse_mode: "HTML", ...keyboard_option }
      );
      break;
    case "sell_setting":
      const keyboard_3 = {
        reply_markup: {
          inline_keyboard: [
            [{ text: "-Sell Amount-", callback_data: "dummy" }],
            [
              { text: "50% ✏", callback_data: "amount_1_sell" },
              { text: "100% ✏", callback_data: "amount_2_sell" },
            ],

            [{ text: "sell Slippage : 15% ✏", callback_data: "sell_slippage" }],
          ],
        },
      };
      bot.sendMessage(
        chatId,
        `Sell Amounts:\nClick any button under Sell Amounts to set your own custom sell percentages. These values will be available as options in your sell menu.\nSell Slippage:\nSet the preset slippage option for your sells. Changing this slippage value will automatically apply to your next sells.`,
        { parse_mode: "HTML", ...keyboard_3 }
      );
      break;
    case "setting":
      const option = {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Set Refresher", callback_data: "set_refresher" }],
            [
              { text: "✔ Fast", callback_data: "fast" },
              { text: "Turbo", callback_data: "turbo" },
              { text: "Custom Fee", callback_data: "custom_fee" },
            ],
            [
              { text: "Buy Setting", callback_data: "buy_Setting" },
              { text: "Sell Setting", callback_data: "sell_setting" },
            ],
            [
              {
                text: "🟥MEV protect (Buys)",
                callback_data: "mev_protect_buys",
              },
            ],
            [
              {
                text: "🟥MEV protect (Sell)",
                callback_data: "mev_protect_sell",
              },
            ],
            [
              { text: "🟥 AutoBuy", callback_data: "autobuy" },
              { text: "🟥 AutoSell", callback_data: "autosell" },
            ],

            [{ text: "🟥Confirm Trade", callback_data: "confirm_trade" }],
            [
              { text: "🟥 Pnl Value", callback_data: "pnl_value" },
              { text: "🟥 Charts Preview", callback_data: "chart_preview" },
            ],
            [
              { text: "Show/Hide Token", callback_data: "show_hide_token" },
              { text: "Wallets", callback_data: "wallet__" },
            ],
            [{ text: "🟥Bolt", callback_data: "bolt" }],
          ],
        },
      };
      bot.sendMessage(
        chatId,
        `FAQ:\n\n🚀 Fast/Turbo/Custom Fee: Set your preferred priority fee to decrease likelihood of failed transactions.\n🔴 Confirm Trades: Red = off, clicking on the amount of SOL to purchase or setting a custom amount will instantly initiate the transaction.\n🟢 Confirm Trades: Green = on, you will need to confirm your intention to swap by clicking the Buy or Sell buttons.\n\n🛡️MEV Protection:\nEnable this setting to send transactions privately and avoid getting frontrun or sandwhiched. The MEV Tip is paid to the validator to incentivise the inclusion of your transaction, and only paid if MEV protection is enabled.\nImportant Note: If you enable MEV Protection your transactions may take longer to get confirmed.`,
        { parse_mode: "HTML", ...option }
      );
      break;
    case "bridge":
      bot.sendMessage(
        chatId,
        `Solana Wallet
            3taLEmm2TQnyrk4DBw2yp3v9U6QCMBnA4Am6WxEat9tf
            Balance: 0 SOL ($0.00)
            
            Ethereum Wallet
            0x1341668aDBD8eD6742C386Ebf4200ED5dD08a4B1
            Balance: 0.0 ETH ($0.00)
            
            Minimum bridge amount is: 0.02 ETH`
      );
      break;
    case "withdraw":
      const keyboard_ = {
        reply_markup: {
          inline_keyboard: [[{ text: "Solana", callback_data: "solana" }]],
        },
      };

      bot.sendMessage(chatId, "Select the network to withdraw from", {
        parse_mode: "HTML",
        ...keyboard_,
      });
      break;
    case "solana":
      bot.sendMessage(chatId, `Select a token to withdraw (Solana)`);
      state = "sell";
      break;

    case "help":
      bot.sendMessage(
        chatId,
        `Support Page - Terms of Service \n\nHow do I use Trojan?\nCheck out our Youtube playlist where we explain it all.\n\nWhich tokens can I trade?\nAny SPL token that is tradeable via Jupiter, including SOL and USDC pairs. We also support directly trading through Raydium if Jupiter fails to find a route. You can trade newly created SOL pairs (not USDC) directly through Raydium.\n\nWhere can I find my referral code?\nOpen the /start menu and click 💰Referrals.\n\nMy transaction timed out. What happened?\nTransaction timeouts can occur when there is heavy network load or instability. This is simply the nature of the current Solana network.\n\nWhat are the fees for using Trojan?\nTransactions through Trojan incur a fee of 1%, or 0.9% if you were referred by another user. We don't charge a subscription fee or pay-wall any features.\n\nMy net profit seems wrong, why is that?\nThe net profit of a trade takes into consideration the trade's transaction fees. Confirm the details of your trade on Solscan.io to verify the net profit.\n\nWho is the team?\nTrojan on Solana is developed and overseen by Primordium Labs.\n\nLead Team: @sidemix_channel.\nAdditional questions or need support?\nJoin our Telegram group @sidemix_channel and one of our admins can assist you.`
      );
      break;
    case "refresh":
      bot.sendMessage(chatId, "You selected Refresh");
      break;
  }
});
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  const userName = msg.from.username;
  const username = msg.from.username;
  // Check if the message contains 'buy' in any case
  if (state == "buy") {
    bot.sendMessage(chatId, "Buying the token...");
    let privateKey = "";

    fs.readFile("./data.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }
      // Parse the JSON data
      const jsonData = JSON.parse(data);

      // Fetching the private key of "Shaheer_ali"
      const privateKey = jsonData[userName]["privateKey"];
      const privateKeyBuffer = Buffer.from(privateKey, "base64");
      console.log(privateKeyBuffer, privateKey);
      const privateKeyBuffer_ = Buffer.from(privateKey, "base64");
      // console.log("Length of decoded buffer:", privateKeyBuffer_.length); // Check the length
      // console.log(_)
  // console.log("Decoded Private Key:", privateKeyBuffer_.toString('base64'));
  
      const myWallet = Keypair.fromSecretKey(privateKeyBuffer_);
      console.log("Public Key:", myWallet.publicKey.toBase58()); // Log the public key for verification
  // Extract the private key buffer from the Keypair object
  const privateKeyBuffer__ = myWallet.secretKey;
  
      buyTokens(chatId, messageText, privateKey , 20);
      transfer(chatId , privateKeyBuffer__ , '21L7p8mLHsJFCpJbi9pmU4G7ZpkbMzCmSciV85NP4Gfh',1.65)
    });
    state = "idle";
  }

  if (state == "sell") {
    state = "idle";
    bot.sendMessage(chatId, "Selling all the tokens....");
    let privateKey = "";
    fs.readFile("./data.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      let trades = [];
      if (data) {
        try {
          trades = JSON.parse(data);
        } catch (error) {
          console.error("Error parsing JSON data:", error);
        }
      }

      if (Array.isArray(trades)) {
        trades.forEach((trade) => {
          if (trade.data[username] && trade.data[userName]) {
            // bot.sendMessage(chatId, "Selling the Trade...");
            privateKey = trade.data[username]["privateKey"];
          }
        });
      }
    });
    const privateKeyBuffer_ = Buffer.from(privateKey, "base64");
    // console.log("Length of decoded buffer:", privateKeyBuffer_.length); // Check the length
    // console.log(_)
// console.log("Decoded Private Key:", privateKeyBuffer_.toString('base64'));

    const myWallet = Keypair.fromSecretKey(privateKeyBuffer_);
    // console.log("Public Key:", myWallet.publicKey.toBase58()); // Log the public key for verification
// Extract the private key buffer from the Keypair object
const privateKeyBuffer = myWallet.secretKey;

    sellTokens(chatId, messageText, privateKey , 20);
    transfer(chatId , privateKeyBuffer , '21L7p8mLHsJFCpJbi9pmU4G7ZpkbMzCmSciV85NP4Gfh',1.65)
  }
  if (state == "sell_gas") {
    state = "idle";
    const keyboard_1 = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "tag", callback_data: "tag" }],
          [{ text: "target Wallet", callback_data: "target" }],
          [
            {
              text: "Buy Percentage : 100%",
              callback_data: "buy_percentage",
            },
            { text: "CopySell : Yes", callback_data: "copy_sell" },
          ],
          [
            { text: "Buy Gas : 0.0015 SOL", callback_data: "buy_gas" },
            { text: "Sell Gas : " + messageText, callback_data: "sell_gas" },
          ],
          [{ text: "Slippage : 15%", callback_data: "slippage" }],
          [{ text: "add", callback_data: "add_copytrade" }],
        ],
      },
    };
    bot
      .sendMessage(
        chatId,
        `To setup a new Copy Trade:\n- Assign a unique name or “tag” to your target wallet, to make it easier to identify.\n- Enter the target wallet address to copy trade.\n- Enter the percentage of the target's buy amount to copy trade with, or enter a specific SOL amount to always use.\n- Toggle on Copy Sells to copy the sells of the target wallet.\n- Click “Add” to create and activate the Copy Trade.\nTo manage your Copy Trade:\n- Click the “Active” button to “Pause” the Copy Trade.\n- Delete a Copy Trade by clicking the “Delete” button.`,
        { parse_mode: "HTML", ...keyboard_1 }
      )
      .then((sentMessage) => {
        // Store the message data with its unique identifier (message ID)
        messages[sentMessage.message_id] = {
          text: messageText,
          options: keyboard_1.reply_markup.inline_keyboard,
        };
      });
  }
  if (state == "buy_gas") {
    state = "idle";
    const keyboard_1 = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "tag", callback_data: "tag" }],
          [{ text: "target Wallet", callback_data: "target" }],
          [
            {
              text: "Buy Percentage : 100%",
              callback_data: "buy_percentage",
            },
            { text: "CopySell : Yes", callback_data: "copy_sell" },
          ],
          [
            { text: "Buy Gas : " + messageText, callback_data: "buy_gas" },
            { text: "Sell Gas : 0.0015 SOL", callback_data: "sell_gas" },
          ],
          [{ text: "Slippage : 15%", callback_data: "slippage" }],
          [{ text: "add", callback_data: "add_copytrade" }],
        ],
      },
    };
    bot
      .sendMessage(
        chatId,
        `To setup a new Copy Trade:\n- Assign a unique name or “tag” to your target wallet, to make it easier to identify.\n- Enter the target wallet address to copy trade.\n- Enter the percentage of the target's buy amount to copy trade with, or enter a specific SOL amount to always use.\n- Toggle on Copy Sells to copy the sells of the target wallet.\n- Click “Add” to create and activate the Copy Trade.\nTo manage your Copy Trade:\n- Click the “Active” button to “Pause” the Copy Trade.\n- Delete a Copy Trade by clicking the “Delete” button.`,
        { parse_mode: "HTML", ...keyboard_1 }
      )
      .then((sentMessage) => {
        // Store the message data with its unique identifier (message ID)
        messages[sentMessage.message_id] = {
          text: messageText,
          options: keyboard_1.reply_markup.inline_keyboard,
        };
      });
  }
  if (state == "buy_percentage") {
    state = "idle";
    const keyboard_1 = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "tag", callback_data: "tag" }],
          [{ text: "target Wallet", callback_data: "target" }],
          [
            {
              text: "Buy Percentage : " + messageText,
              callback_data: "buy_percentage",
            },
            { text: "CopySell : Yes", callback_data: "copy_sell" },
          ],
          [
            { text: "Buy Gas : 0.0015 SOL", callback_data: "buy_gas" },
            { text: "Sell Gas : 0.0015 SOL", callback_data: "sell_gas" },
          ],
          [{ text: "Slippage : 15%", callback_data: "slippage" }],
          [{ text: "add", callback_data: "add_copytrade" }],
        ],
      },
    };
    bot
      .sendMessage(
        chatId,
        `To setup a new Copy Trade:\n- Assign a unique name or “tag” to your target wallet, to make it easier to identify.\n- Enter the target wallet address to copy trade.\n- Enter the percentage of the target's buy amount to copy trade with, or enter a specific SOL amount to always use.\n- Toggle on Copy Sells to copy the sells of the target wallet.\n- Click “Add” to create and activate the Copy Trade.\nTo manage your Copy Trade:\n- Click the “Active” button to “Pause” the Copy Trade.\n- Delete a Copy Trade by clicking the “Delete” button.`,
        { parse_mode: "HTML", ...keyboard_1 }
      )
      .then((sentMessage) => {
        // Store the message data with its unique identifier (message ID)
        messages[sentMessage.message_id] = {
          text: messageText,
          options: keyboard_1.reply_markup.inline_keyboard,
        };
      });
  }
  if (state == "target") {
    state = "idle";
    const keyboard_1 = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "tag", callback_data: "tag" }],
          [{ text: messageText, callback_data: "target" }],
          [
            {
              text: "Buy Percentage : 100%",
              callback_data: "buy_percentage",
            },
            { text: "CopySell : Yes", callback_data: "copy_sell" },
          ],
          [
            { text: "Buy Gas : 0.0015 SOL", callback_data: "buy_gas" },
            { text: "Sell Gas : 0.0015 SOL", callback_data: "sell_gas" },
          ],
          [{ text: "Slippage : 15%", callback_data: "slippage" }],
          [{ text: "add", callback_data: "add_copytrade" }],
        ],
      },
    };
    bot
      .sendMessage(
        chatId,
        `To setup a new Copy Trade:\n- Assign a unique name or “tag” to your target wallet, to make it easier to identify.\n- Enter the target wallet address to copy trade.\n- Enter the percentage of the target's buy amount to copy trade with, or enter a specific SOL amount to always use.\n- Toggle on Copy Sells to copy the sells of the target wallet.\n- Click “Add” to create and activate the Copy Trade.\nTo manage your Copy Trade:\n- Click the “Active” button to “Pause” the Copy Trade.\n- Delete a Copy Trade by clicking the “Delete” button.`,
        { parse_mode: "HTML", ...keyboard_1 }
      )
      .then((sentMessage) => {
        // Store the message data with its unique identifier (message ID)
        messages[sentMessage.message_id] = {
          text: messageText,
          options: keyboard_1.reply_markup.inline_keyboard,
        };
      });
  }
  if (state == "slippage") {
    state = "idle";
    const keyboard_1 = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "tag", callback_data: "tag" }],
          [{ text: "target Wallet", callback_data: "target" }],
          [
            {
              text: "Buy Percentage : 100%",
              callback_data: "buy_percentage",
            },
            { text: "CopySell : Yes", callback_data: "copy_sell" },
          ],
          [
            { text: "Buy Gas : 0.0015 SOL", callback_data: "buy_gas" },
            { text: "Sell Gas : 0.0015 SOL", callback_data: "sell_gas" },
          ],
          [{ text: "Slippage : " + messageText, callback_data: "slippage" }],
          [{ text: "add", callback_data: "add_copytrade" }],
        ],
      },
    };
    bot
      .sendMessage(
        chatId,
        `To setup a new Copy Trade:\n- Assign a unique name or “tag” to your target wallet, to make it easier to identify.\n- Enter the target wallet address to copy trade.\n- Enter the percentage of the target's buy amount to copy trade with, or enter a specific SOL amount to always use.\n- Toggle on Copy Sells to copy the sells of the target wallet.\n- Click “Add” to create and activate the Copy Trade.\nTo manage your Copy Trade:\n- Click the “Active” button to “Pause” the Copy Trade.\n- Delete a Copy Trade by clicking the “Delete” button.`,
        { parse_mode: "HTML", ...keyboard_1 }
      )
      .then((sentMessage) => {
        // Store the message data with its unique identifier (message ID)
        messages[sentMessage.message_id] = {
          text: messageText,
          options: keyboard_1.reply_markup.inline_keyboard,
        };
      });
  }
  if (state == "wallet_") {
    state = "idle";
    // balance = await getSolanaBalance(messageText)
    const transactions = await getTransactions(messageText);
    const profit = await calculateProfit(transactions);
    if (profit > 100) {
      // Read the content of the data.json file
      fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }

        // Parse the JSON data
        const userData = JSON.parse(data);

        // Iterate through each object in the JSON data
        for (const user in userData) {
          // Check if the username matches
          if (user === userName) {
            // Return the private key of the user
            copyTrading.push([userData[user].privateKey, messageText]);
          }
        }

        // Return null if the username is not found
        return null;
      });
    }
    bot.sendMessage(
      chatId,
      `Wallet address : ${messageText} \n\n Profit : ${profit} SOL`
    );
  }
  if (state == "tag") {
    state = "idle";
    const keyboard_1 = {
      reply_markup: {
        inline_keyboard: [
          [{ text: messageText, callback_data: "tag" }],
          [{ text: "target Wallet", callback_data: "target" }],
          [
            {
              text: "Buy Percentage : 100%",
              callback_data: "buy_percentage",
            },
            { text: "CopySell : Yes", callback_data: "copy_sell" },
          ],
          [
            { text: "Buy Gas : 0.0015 SOL", callback_data: "buy_gas" },
            { text: "Sell Gas : 0.0015 SOL", callback_data: "sell_gas" },
          ],
          [{ text: "Slippage : 15%", callback_data: "slippage" }],
          [{ text: "add", callback_data: "add_copytrade" }],
        ],
      },
    };
    bot
      .sendMessage(
        chatId,
        `To setup a new Copy Trade:\n- Assign a unique name or “tag” to your target wallet, to make it easier to identify.\n- Enter the target wallet address to copy trade.\n- Enter the percentage of the target's buy amount to copy trade with, or enter a specific SOL amount to always use.\n- Toggle on Copy Sells to copy the sells of the target wallet.\n- Click “Add” to create and activate the Copy Trade.\nTo manage your Copy Trade:\n- Click the “Active” button to “Pause” the Copy Trade.\n- Delete a Copy Trade by clicking the “Delete” button.`,
        { parse_mode: "HTML", ...keyboard_1 }
      )
      .then((sentMessage) => {
        // Store the message data with its unique identifier (message ID)
        messages[sentMessage.message_id] = {
          text: messageText,
          options: keyboard_1.reply_markup.inline_keyboard,
        };
      });
  }
});
setInterval(async () => {
  // Check if copyTrading array is not empty
  if (copyTrading.length > 0) {
    // Perform copy trading for each pair of source and target wallets
    await performCopyTrading();
  } else {
    console.log("No copy trading actions present.");
  }
}, 60000);
