// Types: Định nghĩa kiểu dữ liệu cho config từ backend

export interface ComponentProps {
  [key: string]: any;
}

export interface ComponentConfig {
  type: string;
  props: ComponentProps;
  children?: ComponentConfig[];
}

export interface PageMetadata {
  version: string;
  lastUpdated: string;
}

export interface PageConfig {
  id: string;
  name: string;
  components: ComponentConfig[];
  metadata: PageMetadata;
}

export interface PageSummary {
  id: string;
  name: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
