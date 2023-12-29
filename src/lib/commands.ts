import type { Context } from "grammy/mod.ts";

const RE_REGEXP = /"\/(?<regex_pattern>.*?)\/(?<regex_flags>[dgimsuvy]*)"/;

export const searchCommand = (ctx: Context) => {
  const query = ctx.message?.text?.split(/ +/)[1];
  const reply = ctx.message?.reply_to_message?.text;
  const botReplyOptions: Parameters<Context["reply"]>[1] = {
    reply_to_message_id: ctx.message?.message_id,
    parse_mode: "HTML",
  };

  if (!query || !reply) {
    ctx.reply(
      "Please provide a search pattern and a reply message.",
      botReplyOptions
    );
    return;
  }

  if (!RE_REGEXP.test(query)) {
    ctx.reply(
      'Please provide a valid RegExp pattern. Example: "/pattern/optional flags"',
      botReplyOptions
    );
    return;
  }

  const { regex_pattern, regex_flags } = RE_REGEXP.exec(query)?.groups ?? {
    regex_pattern: "",
    regex_flags: "",
  };
  ctx.reply(
    reply.replace(
      new RegExp(`(${regex_pattern})`, regex_flags),
      "<b><u>$1</u></b>"
    ),
    botReplyOptions
  );
};
