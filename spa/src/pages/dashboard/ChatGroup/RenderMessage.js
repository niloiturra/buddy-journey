import React from 'react';
import { LinkPreview } from '@dhaiwat10/react-link-preview';

const regexExp =
  /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

const RenderMessage = ({ message }) => {
  return message.match(regexExp) ? (
    <LinkPreview url={message.match(regexExp)} width="20vw" />
  ) : (
    <p className="mb-0">{message}</p>
  );
};

export default RenderMessage;
