import { EntityRepository, Repository } from 'typeorm';
import LoginEntity, { LoginType } from '@/entity/login';

export interface LoginInfo {
  id: string;
  password: string;
  type?: string;
}

@EntityRepository(LoginEntity)
class LoginRepository extends Repository<LoginEntity> {
  async findById(id: string, type: LoginType = LoginType.Own) {
    const account = await this.findOne({ where: { id, type } });
    return account;
  }

  async findByIdx(idx: number) {
    const account = await this.findOne({ where: { idx } });
    return account;
  }

  async removeByIdx(idx: number) {
    const login = await this.findByIdx(idx);
    if (login) {
      await this.remove(login);
    }
  }
}

export default LoginRepository;
