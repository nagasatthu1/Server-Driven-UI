/**
 * Backend Adapter Configuration Guide
 * 
 * This project uses the Adapter Pattern to abstract backend communication,
 * making it easy to switch between different backend frameworks without
 * changing frontend code.
 * 
 * ## Quick Start
 * 
 * 1. Copy `.env.example` to `.env`:
 *    ```bash
 *    cp .env.example .env
 *    ```
 * 
 * 2. Set your backend type in `.env`:
 *    ```
 *    VITE_BACKEND_TYPE=nodejs  # or python, go, java, etc.
 *    VITE_API_BASE_URL=http://localhost:8080/api
 *    ```
 * 
 * ## Supported Backend Types
 * 
 * - `default` - Generic REST API (works with most backends)
 * - `nodejs` - Node.js/Express/NestJS backends
 * - `python` - Python/FastAPI/Django/Flask backends
 * - `go` - Go/Gin/Echo backends
 * - `java` - Java/Spring Boot backends
 * 
 * ## Adding a New Backend Adapter
 * 
 * To add support for a new backend framework:
 * 
 * 1. Create a new adapter in `src/services/api.ts`:
 *    ```typescript
 *    const phpAdapter: BackendAdapter = {
 *      name: 'php',
 *      transformRequest: (config) => {
 *        // Add PHP-specific headers or transformations
 *        config.headers['X-Requested-With'] = 'XMLHttpRequest'
 *        return config
 *      },
 *      transformResponse: (response) => {
 *        // Transform PHP backend responses if needed
 *        return response
 *      },
 *      handleError: async (error) => {
 *        // Custom error handling for PHP backend
 *        throw error
 *      },
 *    }
 *    ```
 * 
 * 2. Register the adapter in the `adapters` object:
 *    ```typescript
 *    const adapters: Record<string, BackendAdapter> = {
 *      default: defaultAdapter,
 *      nodejs: nodejsAdapter,
 *      python: pythonAdapter,
 *      go: goAdapter,
 *      java: javaAdapter,
 *      php: phpAdapter,  // Add your new adapter here
 *    }
 *    ```
 * 
 * 3. Update `.env` with the new backend type:
 *    ```
 *    VITE_BACKEND_TYPE=php
 *    ```
 * 
 * ## Environment Variables
 * 
 * | Variable | Description | Default |
 * |----------|-------------|---------|
 * | `VITE_API_BASE_URL` | Base URL for API requests | `/api` |
 * | `VITE_API_TIMEOUT` | Request timeout in milliseconds | `10000` |
 * | `VITE_BACKEND_TYPE` | Backend framework type | `default` |
 * | `VITE_ENABLE_MOCK_API` | Enable mock API for development | `false` |
 * 
 * ## How It Works
 * 
 * The adapter pattern works by:
 * 
 * 1. **Request Transformation**: Before sending a request, the adapter can
 *    modify headers, body, or other configuration specific to the backend.
 * 
 * 2. **Response Transformation**: After receiving a response, the adapter can
 *    transform the data format if the backend uses a different structure.
 * 
 * 3. **Error Handling**: Each adapter can implement custom error handling
 *    logic based on how the backend returns errors.
 * 
 * ## Example: Switching from Node.js to Python
 * 
 * Current setup (Node.js):
 * ```
 * VITE_BACKEND_TYPE=nodejs
 * VITE_API_BASE_URL=http://localhost:8080/api
 * ```
 * 
 * New setup (Python/FastAPI):
 * ```
 * VITE_BACKEND_TYPE=python
 * VITE_API_BASE_URL=http://localhost:8000/api
 * ```
 * 
 * That's it! No code changes needed. The adapter handles any framework-specific
 * differences automatically.
 * 
 * ## Debugging
 * 
 * To check which adapter is currently active:
 * ```typescript
 * import { getBackendInfo } from '@/services/api'
 * console.log(getBackendInfo())
 * // Output: { type: 'python', adapter: 'python', baseUrl: '...', timeout: 10000 }
 * ```
 */
