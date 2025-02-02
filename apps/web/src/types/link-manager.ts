export interface Link {
  id: string;
  url: string;
  title: string;
  clicks: number;
  isActive: boolean;
}

export interface Collection {
  id: string;
  title: string;
  links: Link[];
  isActive: boolean;
}

export interface Profile {
  name: string;
  role: string;
  avatar: string;
}
