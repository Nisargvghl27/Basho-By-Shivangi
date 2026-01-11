// src/lib/ragPipeline.js
import { db } from './firebase.js';
import { simpleVectorStore } from './simpleVectorStore.js';
import { collection, getDocs, query, where } from 'firebase/firestore';

class RAGPipeline {
  constructor() {
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      await simpleVectorStore.initialize();
      await this.loadFirebaseData();
      this.isInitialized = true;
    } catch (error) {
      console.error('❌ RAG Pipeline initialization failed:', error);
      throw error;
    }
  }

  async loadFirebaseData() {
    try {
      await this.loadProducts();
      await this.loadJournalArticles();
      await this.loadWorkshops();
    } catch (error) {
      console.error('❌ Firebase data loading failed:', error);
      throw error;
    }
  }

  async loadProducts() {
    try {
      const productsSnapshot = await getDocs(collection(db, 'products'));
      
      for (const doc of productsSnapshot.docs) {
        const product = { id: doc.id, ...doc.data() };
        
        // Create searchable text from product data
        const searchText = `
          Product: ${product.name || ''}
          Description: ${product.description || ''}
          Category: ${product.category || ''}
          Price: $${product.price || 0}
          Tags: ${(product.tags || []).join(', ')}
          Materials: ${product.materials || 'ceramic, clay'}
          Style: ${product.style || 'handmade, artisanal'}
        `.trim();

        await simpleVectorStore.addDocument(
          `product_${product.id}`,
          searchText,
          {
            type: 'product',
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price
          }
        );
      }
    } catch (error) {
      console.warn('Could not load products (collection may not exist):', error.message);
    }
  }

  async loadJournalArticles() {
    try {
      const journalSnapshot = await getDocs(collection(db, 'journal'));
      
      for (const doc of journalSnapshot.docs) {
        const article = { id: doc.id, ...doc.data() };
        
        const searchText = `
          Article: ${article.title || ''}
          Content: ${article.content || ''}
          Author: ${article.author || 'Shivangi'}
          Date: ${article.date || ''}
          Category: ${article.category || 'pottery philosophy'}
        `.trim();

        await simpleVectorStore.addDocument(
          `journal_${article.id}`,
          searchText,
          {
            type: 'journal',
            id: article.id,
            title: article.title,
            author: article.author,
            date: article.date
          }
        );
      }
    } catch (error) {
      console.warn('Could not load journal articles (collection may not exist):', error.message);
    }
  }

  async loadWorkshops() {
    try {
      const workshopsSnapshot = await getDocs(collection(db, 'workshops'));
      
      for (const doc of workshopsSnapshot.docs) {
        const workshop = { id: doc.id, ...doc.data() };
        
        const searchText = `
          Workshop: ${workshop.title || workshop.name || workshop.eventName || 'Untitled Workshop'}
          Subtitle: ${workshop.subtitle || ''}
          Description: ${workshop.description || workshop.details || workshop.about || ''}
          Date: ${workshop.date || workshop.startDate || workshop.when || ''}
          Time: ${workshop.time || workshop.duration || workshop.length || ''}
          Price: ₹${workshop.price || workshop.cost || workshop.fee || 0}
          Total Seats: ${workshop.seats || workshop.totalSeats || workshop.capacity || ''}
          Status: ${workshop.status || 'active'}
          Curriculum: ${workshop.curriculum || ''}
        `.trim();

        await simpleVectorStore.addDocument(
          `workshop_${workshop.id}`,
          searchText,
          {
            type: 'workshop',
            id: workshop.id,
            title: workshop.title || workshop.name || workshop.eventName || 'Untitled Workshop',
            subtitle: workshop.subtitle || '',
            description: workshop.description || workshop.details || workshop.about || '',
            date: workshop.date || workshop.startDate || workshop.when || '',
            time: workshop.time || workshop.duration || workshop.length || '',
            price: workshop.price || workshop.cost || workshop.fee || 0,
            seats: workshop.seats || workshop.totalSeats || workshop.capacity || '',
            status: workshop.status || 'active',
            curriculum: workshop.curriculum || ''
          }
        );
      }
    } catch (error) {
      console.warn('⚠️ Could not load workshops (collection may not exist):', error.message);
    }
  }

  async search(query, limit = 5) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const results = await simpleVectorStore.search(query, limit);
      
      return results.documents.map((doc, index) => ({
        content: doc,
        metadata: results.metadatas[index],
        relevance: 1 - (results.distances[index] || 0) // Convert distance to relevance score
      }));
    } catch (error) {
      console.error('RAG search failed:', error);
      return [];
    }
  }

  async getContext(query, limit = 3) {
    const searchResults = await this.search(query, limit);
    
    if (searchResults.length === 0) {
      return 'No specific information found in the Basho knowledge base.';
    }

    return searchResults
      .map((result, index) => `[${index + 1}] ${result.content}`)
      .join('\n\n');
  }
}

export const ragPipeline = new RAGPipeline();
