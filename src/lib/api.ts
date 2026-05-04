export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "https://admin.thobiq.web.id"
    }${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
    ...options,
  };

  // Build request URL
  const queryString = new URLSearchParams(urlParamsObject as Record<string, string>).toString();
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occurred please try again`);
  }
  const data = await response.json();
  return data;
}

/**
 * Extract image URL from Strapi media object
 */
export function getStrapiMedia(media: any) {
  if (!media) {
    return null;
  }
  const url = media.url || (media.data && media.data.attributes && media.data.attributes.url);

  // Return null if no url found
  if (!url) return null;

  const imageUrl = url.startsWith("/")
    ? getStrapiURL(url)
    : url;
  return imageUrl;
}
