export type ChatDevisDraft = {
  type?: string;
  svc?: string;
  city?: string;
  desc?: string;
  cams?: string;
  local?: string;
  name?: string;
  company?: string;
  addr?: string;
  phone?: string;
};

export type ChatLink = {
  href: string;
  titleFr: string;
  titleAr: string;
};

export type ChatAssistantPayload = {
  reply: string;
  links: ChatLink[];
  draft?: ChatDevisDraft;
};

export type ChatTurn = { role: "user" | "assistant"; content: string };
