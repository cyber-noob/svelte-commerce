import { domain } from '$lib/config'
import { PetStoreSitemapService } from '$lib/services'

export async function GET() {
  const resP = await PetStoreSitemapService.fetchProducts()
  const products = resP?.map((product) => {
    product = {
      slug: product.slug
    }
    return product
  })

  const blogRes = await PetStoreSitemapService.fetchBlogs()
  const blogs = blogRes.map((blog) => {
    blog = {
      slug: blog.slug
    }
    return blog
  })

  if (!products) return new Response(undefined, { status: 404 })
  const body = sitemap(products, blogs)

  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  }
  return new Response(body, { headers })
}

const sitemap = (products, blogs) => `<?xml version="1.0" encoding="UTF-8" ?>
      <urlset
        xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml"
        xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
      >
      <url>
        <loc>${domain}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>

      <url>
        <loc>${domain}/new-trending</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>

      <url>
        <loc>${domain}/blogs</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>

        ${products
  .map(
    (product) =>
      `
              <url>
                <loc>${domain}${product.slug}</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
              </url>
            `
  )
  .join('')}

					 ${blogs
  .map(
    (blog) =>
      `
              <url>
                <loc>${domain}${blog.slug}</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
              </url>
            `
  )
  .join('')}
      </urlset>
    `
