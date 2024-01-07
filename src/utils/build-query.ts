export interface IFullQuery {
  where?: string | string[];
  sortBy?: string | string[];
  page?: string;
  pageSize?: string;
  populate?: string | string[];
  select?: string | string[];
  count?: string;
}

import { Repository } from "typeorm";

export interface IFullQuery {
  where?: string | string[];
  sortBy?: string | string[];
  page?: string;
  pageSize?: string;
  populate?: string | string[];
  select?: string | string[];
  count?: string;
}

export async function buildQuery<T>(repository: Repository<T>, query: IFullQuery): Promise<T[]> {
  let queryBuilder = repository.createQueryBuilder("entity");

  if (query.where) {
    if (Array.isArray(query.where)) {
      query.where.forEach((condition: string) => {
        queryBuilder = queryBuilder.andWhere(condition);
      });
    } else {
      queryBuilder = queryBuilder.where(query.where);
    }
  }

  if (query.sortBy) {
    if (Array.isArray(query.sortBy)) {
      query.sortBy.forEach((sortCondition: string) => {
        queryBuilder = queryBuilder.addOrderBy(sortCondition);
      });
    } else {
      queryBuilder = queryBuilder.orderBy(query.sortBy);
    }
  }

  if (query.page && query.pageSize) {
    const page = parseInt(query.page);
    const pageSize = parseInt(query.pageSize);
    queryBuilder = queryBuilder.skip((page - 1) * pageSize).take(pageSize);
  }

  if (query.populate) {
    if (Array.isArray(query.populate)) {
      query.populate.forEach((relation: string) => {
        queryBuilder = queryBuilder.leftJoinAndSelect(`entity.${relation}`, relation);
      });
    } else {
      queryBuilder = queryBuilder.leftJoinAndSelect(`entity.${query.populate}`, query.populate);
    }
  }

  if (query.select) {
    if (Array.isArray(query.select)) {
      query.select.forEach((field: string) => {
        queryBuilder = queryBuilder.addSelect(`entity.${field}`);
      });
    } else {
      queryBuilder = queryBuilder.select(query.select);
    }
  }

  return await queryBuilder.getMany();
}
