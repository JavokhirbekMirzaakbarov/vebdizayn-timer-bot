const { Telegraf } = require("telegraf");
const axios = require("axios");
require("dotenv").config();
const saveTime = require("./api");

const env = process.env;

const bot = new Telegraf(env.TELEGRAM_API_TOKEN);

const months = [
  /january/i,
  /february/i,
  /march/i,
  /april/i,
  /may/i,
  /june/i,
  /july/i,
  /august/i,
  /september/i,
  /october/i,
  /november/i,
  /december/i,
];

const monthRegex =
  /(January|February|March|April|May|June|July|August|September|October|November|December)/i;
const dayRegex = /([1-9]|[12]\d|3[01])/;

const isValidMonth = (month) => monthRegex.test(month);

const isValidDay = (day) => dayRegex.test(day);

let selectedMonth = "";
let selectedDay = "";

bot.start((ctx) => {
  selectedDay = "";
  selectedMonth = "";
  ctx.reply("Xush kelibsiz!");
  ctx.reply("Oyni kiriting:");
});

bot.hears(months, (ctx) => {
  selectedMonth = ctx.message.text;
  ctx.reply("Kunni kiriting:");
});

bot.hears(dayRegex, async (ctx) => {
  selectedDay = ctx.message.text;

  if (isValidDay(selectedDay) && isValidMonth(selectedMonth)) {
    ctx.reply(`Siz ${selectedMonth}, ${selectedDay} ni tanladingiz!`);

    const isSaved = await saveTime(selectedMonth, selectedDay);
    if (isSaved) ctx.reply("O'zgarishlar muvaffaqqiyatli amalga oshirildi!");
    else ctx.reply("Xatolik, qaytadan urining!");
  } else {
    ctx.reply("Xatolik, qaytadan urining!");
  }
});

bot.on("message", (ctx) => {
  ctx.reply("Noto'g'ri buyruq, /start ni kiriting!");
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
