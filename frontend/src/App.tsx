import { useState, useEffect } from 'react';
import { PageConfig, PageSummary } from './types/dynamic';
import { pageService } from './services/pageService';
import DynamicComponent from './components/DynamicComponent';

function App() {
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [currentPage, setCurrentPage] = useState<PageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load pages list on mount
  useEffect(() => {
    const loadPages = async () => {
      try {
        const pagesData = await pageService.getPages();
        setPages(pagesData);
        
        // Load first page by default
        if (pagesData.length > 0) {
          await loadPage(pagesData[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load pages');
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  // Listen for navigation events from components
  useEffect(() => {
    const handleNavigate = (event: CustomEvent<{ pageId: string }>) => {
      loadPage(event.detail.pageId);
    };

    window.addEventListener('navigate', handleNavigate as EventListener);
    return () => {
      window.removeEventListener('navigate', handleNavigate as EventListener);
    };
  }, []);

  const loadPage = async (pageId: string) => {
    try {
      setLoading(true);
      const pageData = await pageService.getPageConfig(pageId);
      setCurrentPage(pageData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load page');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !currentPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-red-600 text-lg font-semibold mb-2">Lỗi kết nối</div>
          <p className="text-gray-600">{error}</p>
          <p className="text-gray-500 text-sm mt-4">
            Đảm bảo backend đang chạy tại http://localhost:3000
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex gap-3 flex-wrap items-center">
          <h3 className="text-xl font-bold text-indigo-600 mr-4">🎨 Dynamic FE</h3>
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => loadPage(page.id)}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                currentPage?.id === page.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
              }`}
            >
              {page.name}
            </button>
          ))}
        </div>

        {/* Page Content */}
        <div className="bg-white rounded-xl shadow-2xl p-8 min-h-[500px]">
          {currentPage && (
            <>
              <h2 className="text-3xl font-bold text-indigo-600 mb-6">
                {currentPage.name}
              </h2>
              
              {/* Render all components dynamically */}
              {currentPage.components.map((component, index) => (
                <DynamicComponent key={index} component={component} />
              ))}

              {/* Metadata Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
                <strong>📋 Metadata:</strong> Version {currentPage.metadata.version} | 
                Cập nhật: {new Date(currentPage.metadata.lastUpdated).toLocaleString('vi-VN')}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
