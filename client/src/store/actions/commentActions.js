import { SEND_COMMENTS_PATH } from "./commentTypes";

export const sendCommentsPath = (itineraryPathName) => {
  console.log(itineraryPathName);
  return {
    type: SEND_COMMENTS_PATH,
    payload: itineraryPathName,
  };
};
