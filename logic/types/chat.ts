/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface createChat {
  chatId: string;
  name?: string;
}

export interface deleteChat {
  chatId?: string;
  name?: string;
}

export interface getChat {
  chatId?: string;
  name?: string;
}

export interface updateChat {
  chatId?: string;
  name?: string;
  newChatId?: string;
  newName?: string;
}