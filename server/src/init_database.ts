import { User } from './entity/User';
import * as bcrypt from 'bcryptjs';
export class InitDatabase {
  constructor(){
    this.setUpperAdmin()
  }

  setUpperAdmin = async () => {
   const existuser = User.getRepository()
    .createQueryBuilder("u")
    .where("roles LIKE :search",{search: `%supperadmin%`})
    .andWhere("u.firstName = 'Ray' AND u.lastName = 'David' AND u.email = :email",{email: "raydavid14011998@gmail.com"})
    .getOne()
    if(!existuser){
      const obj = new User();
      const hashedPassword = await bcrypt.hash("raydavid", 10);
      obj.lastName = "David";
      obj.firstName = "Ray";
      obj.email = "raydavid14011998@gmail.com";
      obj.password = hashedPassword;
      obj.phone = "0359005013";
      obj.roles = ["supperadmin","administrator","authenticated"];
      await obj.save();
    }
  }
}