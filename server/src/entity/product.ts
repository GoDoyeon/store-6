import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import CategoryEntity from './category';

@Entity({ name: 'product' })
class ProductEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ length: 100 })
  title: string;

  @Column('text')
  thumbnail: string;

  @Column('int')
  originPrice: number;

  @Column('int')
  rank: number;

  @Column('int')
  discountedPrice: number;

  @Column('simple-json')
  mandatoryInfo: { key: string; value: string };

  @Column('longtext', { nullable: true })
  description: string;

  @Column('simple-json')
  shipInfo: { key: string; value: string };

  @Column('text', { nullable: true })
  policy: string;

  @ManyToOne(() => CategoryEntity, categoryEntity => categoryEntity.idx, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'category_idx' })
  category: CategoryEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default ProductEntity;
