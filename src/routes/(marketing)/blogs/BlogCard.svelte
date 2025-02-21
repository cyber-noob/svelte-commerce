<script>
  export let article;
</script>

<button
  class="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-100 shadow-xl"
  on:click={() => location.href='/blogs/' + article.slug}
>
  <div class="flex flex-col md:flex-row h-full">
    <div class="md:w-1/3 relative">
      <img
        src={article.picture}
        alt={article.title}
        class="w-full h-48 md:h-full object-cover"
      />
    </div>
    <div class="md:w-2/3 p-6 flex flex-col justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{article.title}</h2>
      </div>
      <div class="mt-4 flex items-center justify-between">
        <div class="flex items-center">
          <img
            class="h-10 w-10 rounded-full mr-2"
            src={article.author.avatar}
            alt={article.author.name}
          />
          <div>
            <p class="text-sm font-medium text-gray-900">{article.author.name}</p>
            <p class="text-xs text-gray-500">{article.created_on}</p>
          </div>
        </div>
        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
          {article?.category || ''}
        </span>
      </div>
    </div>
  </div>
</button>
