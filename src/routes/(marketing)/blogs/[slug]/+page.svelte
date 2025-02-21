<style>
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin: 20px;
  }
  h1, h2 {
    color: #333;
  }
  ul {
    list-style-type: disc;
    margin-left: 20px;
  }
  p {
    margin-bottom: 15px;
  }
</style>
<script lang="ts">

  import SEO from 'lib/components/SEO/index.svelte'

  export let data
  let blog = data.blog

  let seoProps = {
    title: blog?.title || 'Blog',
    description: `Blog Detail`
  }
</script>

<SEO {...seoProps} />

<div class="max-w-3xl mx-auto px-4 py-12">
  <!-- Author information -->
  <div class="flex items-center mb-8">
    <img
      src={blog.picture}
      alt={blog.username}
      class="w-16 h-16 rounded-full mr-4 object-cover"
    />
    <div>
      <h3 class="text-xl font-medium text-gray-900">{blog.username}</h3>
      <p class="text-gray-600">{blog.role}</p>
      <p class="text-gray-500 text-sm mt-1">{blog.created_on}</p>
    </div>
  </div>

  <!-- Blog post content -->
  <div class="prose prose-lg max-w-none">
    {@html blog.content}
  </div>
</div>
