import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all content
  app.get("/api/content", async (req, res) => {
    try {
      const content = await storage.getAllContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  // Get trending content (MUST come before /api/content/:id)
  app.get("/api/content/trending", async (req, res) => {
    try {
      const content = await storage.getTrendingContent();
      console.log("Trending content result:", content?.length || 0, "items");
      res.json(content || []);
    } catch (error) {
      console.error("Error fetching trending content:", error);
      res.status(500).json({ error: "Failed to fetch trending content" });
    }
  });

  // Get featured content (MUST come before /api/content/:id)
  app.get("/api/content/featured", async (req, res) => {
    try {
      const content = await storage.getFeaturedContent();
      console.log("Featured content result:", content?.length || 0, "items");
      res.json(content || []);
    } catch (error) {
      console.error("Error fetching featured content:", error);
      res.status(500).json({ error: "Failed to fetch featured content" });
    }
  });

  // Get content by type
  app.get("/api/content/type/:type", async (req, res) => {
    try {
      const content = await storage.getContentByType(req.params.type);
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch content by type" });
    }
  });

  // Get content by ID (MUST come after specific routes)
  app.get("/api/content/:id", async (req, res) => {
    try {
      const content = await storage.getContentById(req.params.id);
      if (!content) {
        return res.status(404).json({ error: "Content not found" });
      }
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  // Search content
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Search query is required" });
      }
      const content = await storage.searchContent(query);
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to search content" });
    }
  });

  // Get categories by content ID
  app.get("/api/content/:id/categories", async (req, res) => {
    try {
      const categories = await storage.getCategoriesByContentId(req.params.id);
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Get category by ID
  app.get("/api/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}