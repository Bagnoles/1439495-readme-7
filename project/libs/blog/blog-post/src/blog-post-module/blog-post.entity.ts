import { Entity, Post, StorableEntity, PostType, TextPost, VideoPost, PhotoPost, LinkPost, QuotePost, Tag } from '@project/shared-core';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public userId: string;
  public type: PostType;
  public isDraft: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public publishDate: Date
  public tags?: Tag[];
  public commentsCount: number;
  public likesCount: number;
  public content?: TextPost | VideoPost | PhotoPost | LinkPost | QuotePost;

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post) {
    if (!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.userId = post.userId;
    this.type = post.type;
    this.isDraft = post.isDraft;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.publishDate = post.publishDate;
    this.tags = post.tags ?? [];
    this.content = post.content ?? undefined;
    this.commentsCount = post.commentsCount ?? 0;
    this.likesCount = post.likesCount ?? 0;
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      userId: this.userId,
      type: this.type,
      isDraft: this.isDraft,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      publishDate: this.publishDate,
      tags: this.tags,
      content: this.content,
      commentsCount: this.commentsCount,
      likesCount: this.likesCount
    }
  }
}
