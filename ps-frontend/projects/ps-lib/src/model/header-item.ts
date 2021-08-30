export interface HeaderItem {
  icon: string;
  name: string;
  route: string;
  iconSrc?: string;
}

export interface HeaderItemExtra extends HeaderItem {
  selected: boolean;
}
