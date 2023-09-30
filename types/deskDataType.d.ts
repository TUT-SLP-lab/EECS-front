interface DeskDataType {
  room: string;
  desk_id: string;
  email: undefined | string;
  username: undefined | string;
  position: { x: number; y: number };
  size: { x: number; y: number };
  createdAt: string;
  updatedAt: string;
}
