import { Model } from "mongoose";
import { estimatedDocumentCount } from "./docCount";

/**
 *
 * @param {number} limit number of items to show per page
 * @param {number} offset number of items to skip
 * @param {number} documentCount document count
 * @returns {object} pagination object
 */
export const getPagination = async (
  limit: number,
  offset: number,
  collection: Model<any>,
  query?: object
): Promise<object> => {
  try {
    const documentCount = await estimatedDocumentCount(collection, query);
    const pages = Math.ceil(documentCount / limit);
    const currentPage = Math.ceil(offset / limit) + 1;
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;
    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < pages;
    const firstPage = 1;
    const lastPage = pages;
    const previousPageUrl = hasPreviousPage
      ? `?limit=${limit}&offset=${(previousPage - 1) * limit}`
      : "";
    const nextPageUrl = hasNextPage
      ? `?limit=${limit}&offset=${(nextPage - 1) * limit}`
      : "";
    const firstPageUrl = `?limit=${limit}&offset=${(firstPage - 1) * limit}`;
    const lastPageUrl = `?limit=${limit}&offset=${(lastPage - 1) * limit}`;
    const currentPageUrl = `?limit=${limit}&offset=${offset}`;
    const pagination = {
      pages,
      currentPage,
      previousPage,
      nextPage,
      hasPreviousPage,
      hasNextPage,
      firstPage,
      lastPage,
      previousPageUrl,
      nextPageUrl,
      firstPageUrl,
      lastPageUrl,
      currentPageUrl,
    };
    return pagination;
  } catch (error) {
    throw new Error(error);
  }
};
