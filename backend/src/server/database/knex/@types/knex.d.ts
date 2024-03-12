import { IClient, IUser} from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    client: IClient;
    user: IUser;
  }
}