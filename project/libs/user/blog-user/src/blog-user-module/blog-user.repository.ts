import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseMongoRepository } from '@project/data-access';
import { BlogUserEntity } from './blog-user.entity';
import { BlogUserFactory } from './blog-user.factory';
import { BlogUserModel } from './blog-user.model';

@Injectable()
export class BlogUserRepository extends BaseMongoRepository<BlogUserEntity, BlogUserModel> {
  constructor(
    entityFactory: BlogUserFactory,
    @InjectModel(BlogUserModel.name) blogUserModel: Model<BlogUserModel>
  ) {
    super(entityFactory, blogUserModel);
  }

  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    const document = await this.model.findOne({email}).exec();
    const entity = await this.createEntityFromDocument(document);
    if (entity) {
      entity.id = document._id.toString();
    }
    return entity;
  }

  public async changePassword(email:string, password: string) {
    const document = await this.model.findOne({email}).exec();
    const entity = await this.createEntityFromDocument(document);
    await entity.setPassword(password);
  }
}
