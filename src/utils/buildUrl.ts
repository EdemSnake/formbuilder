/**
 * Собирает URL со строкой запроса в самом простом виде.
 *
 * @param fullUrl — полный URL без query-параметров, например "https://api.example.com/resources"
 * @param params — объект { ключ: значение }, где value приводится к строке
 * @returns URL вида "https://…/resources?key1=val1&key2=val2"
 */
export function buildUrl(
    fullUrl: string,
    params: Record<string, any> = {}
  ): string {
    // Удаляем возможный / в конце
    const url = fullUrl.replace(/\/+$/, "");
  
    // Собираем пары "ключ=значение"
    const parts: string[] = [];
    for (const key in params) {
      const value = params[key];
      if (value != null) {
        parts.push(`${key}=${value}`);
      }
    }
  
    // Добавляем ? и & только если есть параметры
    return parts.length > 0 ? `${url}?${parts.join("&")}` : url;
  }