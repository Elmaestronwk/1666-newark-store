import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useMediaStore = create((set, get) => ({
  media: [],
  isLoading: false,
  error: null,

  fetchMedia: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('media')
        .select(`
          *,
          comments (*),
          reviews (*)
        `)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedData = (data || []).map(item => ({
        ...item,
        comments: item.comments || [],
        reviews: item.reviews || []
      }));

      set({ media: formattedData, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false, media: [] });
    }
  },

  uploadMedia: async (file, metadata) => {
    set({ isLoading: true });
    try {
      // 1. Upload to Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      const { data, error: dbError } = await supabase
        .from('media')
        .insert([{
          title: metadata.title,
          description: metadata.description,
          location: metadata.location,
          tag: metadata.tag,
          media_url: publicUrl,
          media_type: file.type.startsWith('video/') ? 'video' : 'image',
          post_date: metadata.date || new Date().toISOString().split('T')[0],
          is_published: metadata.is_published || false,
          is_featured: metadata.is_featured || false,
          sort_order: get().media.length // Add to end by default
        }])
        .select();

      if (dbError) throw dbError;

      set((state) => ({ 
        media: [data[0], ...state.media],
        isLoading: false 
      }));
      return data[0];
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  addComment: async (mediaId, commentData) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{
          media_id: mediaId,
          user_name: commentData.user_name,
          content: commentData.content,
          status: 'pending'
        }])
        .select();

      if (error) throw error;
      return data[0];
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  addReview: async (mediaId, reviewData) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([{
          media_id: mediaId,
          user_name: reviewData.user_name,
          comment: reviewData.comment,
          rating: reviewData.rating,
          status: 'pending'
        }])
        .select();

      if (error) throw error;
      return data[0];
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  updateMedia: async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('media')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      set((state) => ({
        media: state.media.map(m => m.id === id ? { ...m, ...data[0] } : m)
      }));
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  deleteMedia: async (id) => {
    try {
      const { error } = await supabase
        .from('media')
        .delete()
        .eq('id', id);

      if (error) throw error;
      set((state) => ({
        media: state.media.filter(m => m.id !== id)
      }));
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  updateMediaOrder: async (newOrder) => {
    // newOrder: [{id: string, sort_order: number}]
    try {
      const { error } = await supabase
        .from('media')
        .upsert(newOrder, { onConflict: 'id' });

      if (error) throw error;
      
      // Re-fetch to ensure store is in sync
      get().fetchMedia();
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  }
}));
