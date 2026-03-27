/**
 * Sends a notification message to a Telegram chat via the Bot API.
 * Uses environment variables for the bot token and chat ID.
 */
export const sendTelegramMessage = async (message: string): Promise<void> => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Telegram bot token or chat ID is missing in environment variables.");
    return;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to send Telegram message:", errorData);
    }
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
};
