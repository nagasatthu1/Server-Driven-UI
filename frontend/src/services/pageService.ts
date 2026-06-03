// Services: API calls để lấy config từ backend
import { ApiResponse, PageConfig, PageSummary } from '../types/dynamic';

const API_BASE_URL = 'http://localhost:3000/api/v1';

export const pageService = {
  // Lấy danh sách tất cả các trang
  async getPages(): Promise<PageSummary[]> {
    const response = await fetch(`${API_BASE_URL}/pages`);
    const result: ApiResponse<PageSummary[]> = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch pages');
    }
    
    return result.data;
  },

  // Lấy config chi tiết của một trang
  async getPageConfig(pageId: string): Promise<PageConfig> {
    const response = await fetch(`${API_BASE_URL}/pages/${pageId}`);
    const result: ApiResponse<PageConfig> = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || `Failed to fetch page config for ${pageId}`);
    }
    
    return result.data;
  },

  // Lấy config của một component cụ thể
  async getComponentConfig(pageId: string, componentType: string) {
    const response = await fetch(`${API_BASE_URL}/pages/${pageId}/components/${componentType}`);
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || `Failed to fetch component config`);
    }
    
    return result.data;
  }
};
