import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from "@/config";
import axios from "axios";
import moment from "moment";

const baseUrl = "https://api.telegram.org";

type messageBody = {
  student: string;
  title: string;
  subject: string;
  created_at: string | undefined;
};

export const sendTelegramMessage = async (
  message: messageBody
): Promise<void> => {
  const url = `${baseUrl}/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

 
  const createdAt = message.created_at
    ? moment(message.created_at).format("DD-MM-YYYY HH:mm:ss")
    : moment().format("DD-MM-YYYY HH:mm:ss");

  const formattedMessage = `
*New Assignment*  
---------------------------------
*Student:* ${message.student}  
*Title:* ${message.title}  
*Subject:* ${message.subject}  

*Created At:* ${createdAt}  
---------------------------------
 _Automatically sent by the system._
`;
  await axios.post(url, {
    chat_id: TELEGRAM_CHAT_ID,
    text: formattedMessage,
    parse_mode: "Markdown",
  });
};
