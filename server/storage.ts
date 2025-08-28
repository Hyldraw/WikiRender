import { type User, type InsertUser, type Content, type InsertContent, type Category, type InsertCategory } from "@shared/schema";
import { randomUUID } from "crypto";

import { contentDatabase as contentDatabaseRecord, getAllContent, getContentById as getContentByIdFromData } from "../client/src/lib/content-data";

// Convert record to array for easier manipulation
let contentDatabase = Object.values(contentDatabaseRecord);
import type { Content as ClientContent } from "@shared/schema"; // Import Content type from client for clarity

export interface Category {
  id: string;
  name: string;
  type: string;
  contentId: string;
  data: Record<string, any>;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getAllContent(): Promise<Content[]>;
  getContentById(id: string): Promise<Content | undefined>;
  getContentByType(type: string): Promise<Content[]>;
  getTrendingContent(): Promise<Content[]>;
  getFeaturedContent(): Promise<Content[]>;
  searchContent(query: string): Promise<Content[]>;
  createContent(content: InsertContent): Promise<Content>;

  getCategoriesByContentId(contentId: string): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  
}

// Use the new storage implementation
export const storage: IStorage = {
  async getAllContent(): Promise<Content[]> {
    return contentDatabase.map(item => ({
      id: item.id,
      title: item.title,
      type: item.type,
      year: item.year,
      rating: item.rating,
      description: item.description,
      poster: item.poster,
      background: item.background,
      metadata: item.metadata,
      categories: null, // Will be populated separately
      trending: item.trending || 0,
      featured: item.featured ? 1 : 0
    }));
  },

  async getContentById(id: string): Promise<Content | undefined> {
    const content = contentDatabase.find(item => item.id === id);
    if (!content) return undefined;

    return {
      id: content.id,
      title: content.title,
      type: content.type,
      year: content.year,
      rating: content.rating,
      description: content.description,
      poster: content.poster,
      background: content.background,
      metadata: content.metadata,
      categories: null,
      trending: content.trending,
      featured: content.featured ? 1 : 0
    };
  },

  async getContentByType(type: string): Promise<Content[]> {
    const allContent = await this.getAllContent();
    return allContent.filter(content => content.type === type);
  },

  async getTrendingContent(): Promise<Content[]> {
    const allContent = await this.getAllContent();
    return allContent
      .filter(content => content.trending && content.trending > 0)
      .sort((a, b) => (a.trending || 0) - (b.trending || 0))
      .slice(0, 20);
  },

  async getFeaturedContent(): Promise<Content[]> {
    const allContent = await this.getAllContent();
    return allContent
      .filter(content => content.featured === 1)
      .slice(0, 20);
  },

  async searchContent(query: string): Promise<Content[]> {
    const allContent = await this.getAllContent();
    const lowerQuery = query.toLowerCase();

    return allContent.filter(content =>
      content.title.toLowerCase().includes(lowerQuery) ||
      (content.description && content.description.toLowerCase().includes(lowerQuery)) ||
      content.type.toLowerCase().includes(lowerQuery)
    );
  },

  async getCategoriesByContentId(contentId: string): Promise<Category[]> {
    const content = contentDatabase.find(item => item.id === contentId);
    if (!content || !content.categories) return [];

    const categories: Category[] = [];

    Object.entries(content.categories).forEach(([categoryType, items]) => {
      // Ensure items is an array before iterating
      if (Array.isArray(items)) {
        items.forEach(item => {
          categories.push({
            id: item.id,
            name: item.name,
            type: categoryType, // Use categoryType as the type for the category
            contentId: contentId,
            data: item.data
          });
        });
      }
    });

    return categories;
  },

  async getCategoryById(id: string): Promise<Category | undefined> {
    for (const content of contentDatabase) {
      if (content.categories) {
        for (const [categoryType, items] of Object.entries(content.categories)) {
          // Ensure items is an array before finding
          if (Array.isArray(items)) {
            const item = items.find(item => item.id === id);
            if (item) {
              return {
                id: item.id,
                name: item.name,
                type: categoryType, // Use categoryType as the type for the category
                contentId: content.id,
                data: item.data
              };
            }
          }
        }
      }
    }

    return undefined;
  },

  // Placeholder methods to satisfy the IStorage interface, as they are not implemented in the provided snippet.
  // These would need to be implemented if the MemStorage class logic was intended to be kept.
  async getUser(id: string): Promise<User | undefined> {
    // This method is not implemented in the new storage approach.
    // If User management is needed, it should be integrated here.
    return undefined;
  },
  async getUserByUsername(username: string): Promise<User | undefined> {
    // This method is not implemented in the new storage approach.
    return undefined;
  },
  async createUser(insertUser: InsertUser): Promise<User> {
    // This method is not implemented in the new storage approach.
    throw new Error("Method not implemented.");
  },
  async createContent(insertContent: InsertContent): Promise<Content> {
    // This method is not implemented in the new storage approach.
    throw new Error("Method not implemented.");
  },
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    // This method is not implemented in the new storage approach.
    throw new Error("Method not implemented.");
  },

  
};