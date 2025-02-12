import config from "../config";
import { Client, ID, Storage, Query, Databases } from "appwrite";

export class Service {
  client = new Client();
  databases;
  buckets;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.buckets = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const databases = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
      return databases;
    } catch (error) {
      console.error("createPost", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const databases = await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
      return databases;
    } catch (error) {
      console.error("updatePost", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("deletePost", error);
      throw error;
    }
  }

  async getSinglePost(slug) {
    try {
      const databases = await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return databases;
    } catch (error) {
      console.error("getSinglePost", error);
      throw error;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const databases = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
      return databases;
    } catch (error) {
      console.error("getPosts", error);
      throw error;
    }
  }

  // file upload Service
  async uploadFile(file) {
    try {
      const storage = await this.buckets.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
      return storage;
    } catch (error) {
      console.error("uploadFile", error);
      throw error;
    }
  }

  // delete file
  async deleteFile(fileId) {
    try {
      await this.buckets.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("deleteFile", error);
      throw error;
    }
  }

  // get file preview
  async getFilePreview(fileId) {
    try {
      const storage = await this.buckets.getFilePreview(
        config.appwriteBucketId,
        fileId
      );
      return storage;
    } catch (error) {
      console.error("getFilePreview", error);
      throw error;
    }
  }
}

const servic = new Service();
export default servic;
