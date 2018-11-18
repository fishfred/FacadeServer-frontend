import {OnlinePlayerMetadata} from "common/io/OnlinePlayerMetadata";

export interface UserManagementTabState {
  onlinePlayers?: OnlinePlayerMetadata[];
  blacklist?: string[];
  whitelist?: string[];
}
