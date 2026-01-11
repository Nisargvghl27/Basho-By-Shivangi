// src/lib/simpleVectorStore.js
// In-memory vector store for RAG (no external dependencies)

class SimpleVectorStore {
  constructor() {
    this.documents = [];
    this.embeddings = [];
    this.metadata = [];
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize simple vector store:', error);
      throw error;
    }
  }

  // Simple text-based embedding
  async generateEmbedding(text) {
    const words = text.toLowerCase().split(/\s+/);
    const embeddings = new Array(384).fill(0);
    
    // Simple hash-based embedding
    words.forEach((word, index) => {
      const hash = this.hashCode(word);
      const position = Math.abs(hash) % embeddings.length;
      embeddings[position] += 1 / (index + 1);
    });
    
    // Normalize
    const magnitude = Math.sqrt(embeddings.reduce((sum, val) => sum + val * val, 0));
    return embeddings.map(val => magnitude > 0 ? val / magnitude : 0);
  }

  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }

  async addDocument(id, text, metadata = {}) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const embedding = await this.generateEmbedding(text);
      
      this.documents.push(text);
      this.embeddings.push(embedding);
      this.metadata.push({ id, ...metadata });
    } catch (error) {
      console.error('Failed to add document:', error);
      throw error;
    }
  }

  // Simple cosine similarity search
  async search(query, limit = 5) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const queryEmbedding = await this.generateEmbedding(query);
      const similarities = [];
      
      for (let i = 0; i < this.embeddings.length; i++) {
        const similarity = this.cosineSimilarity(queryEmbedding, this.embeddings[i]);
        similarities.push({
          index: i,
          similarity: similarity,
          document: this.documents[i],
          metadata: this.metadata[i]
        });
      }
      
      // Sort by similarity (descending) and take top results
      similarities.sort((a, b) => b.similarity - a.similarity);
      const topResults = similarities.slice(0, limit);
      
      return {
        documents: topResults.map(r => r.document),
        metadatas: topResults.map(r => r.metadata),
        distances: topResults.map(r => 1 - r.similarity) // Convert similarity to distance
      };
    } catch (error) {
      console.error('Search failed:', error);
      return { documents: [], metadatas: [], distances: [] };
    }
  }

  cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    
    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);
    
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (normA * normB);
  }

  async getCollectionCount() {
    return this.documents.length;
  }

  // Clear all documents (useful for testing)
  async clear() {
    this.documents = [];
    this.embeddings = [];
    this.metadata = [];
  }
}

export const simpleVectorStore = new SimpleVectorStore();
