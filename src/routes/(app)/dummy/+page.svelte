<script lang="ts">
  import HeaderImg from '$lib/assets/dogg-removebg-preview.png'
  import RoundTable from '$lib/assets/round-table.jpg'
  import OwnPuppy from '$lib/icons/own_puppy.svg'
  import Accessories from '$lib/icons/puppy_accessories.svg'
  import Health from '$lib/icons/puppy_health.svg'
</script>
<section class="m-8">
  <form
    action="https://my-user-images.fly.storage.tigris.dev/"
    method="post"
    enctype="multipart/form-data"
  >
    Key to upload:
    <input type="input" name="key" value="images1/hey" /><br />
    <input
      type="hidden"
      name="success_action_redirect"
      value="https://your-website.com/success.html"
    />
    <input type="hidden" name="Content-Type" value="image/jpeg" /><br />
    <input type="hidden" name="x-amz-meta-uuid" value="465888667" />
    <input
      type="hidden"
      name="X-Amz-Credential"
      value="tid_example_key_id/20240330/auto/s3/aws4_request"
    />
    <input type="hidden" name="X-Amz-Algorithm" value="AWS4-HMAC-SHA256" />
    <input type="hidden" name="X-Amz-Date" value="20240330T000000Z" />
    <input
      type="hidden"
      name="Policy"
      value="eyJleHBpcmF0aW9uIjoiMjAyNC0wMy0zMFQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W3siYnVja2V0IjoibXktdXNlci1pbWFnZXMifSxbInN0YXJ0cy13aXRoIiwiJGtleSIsImltYWdlczEvIl0seyJzdWNjZXNzX2FjdGlvbl9yZWRpcmVjdCI6Imh0dHBzOi8veW91ci13ZWJzaXRlLmNvbS9zdWNjZXNzLmh0bWwifSxbInN0YXJ0cy13aXRoIiwiJENvbnRlbnQtVHlwZSIsImltYWdlLyJdLHsieC1hbXotbWV0YS11dWlkIjoiNDY1ODg4NjY3In0seyJ4LWFtei1jcmVkZW50aWFsIjoidGlkX2V4YW1wbGVfa2V5X2lkLzIwMjQwMzMwL2F1dG8vczMvYXdzNF9yZXF1ZXN0In0seyJ4LWFtei1hbGdvcml0aG0iOiJBV1M0LUhNQUMtU0hBMjU2In0seyJ4LWFtei1kYXRlIjoiMjAyNDAzMzBUMDAwMDAwWiJ9XX0="
    />
    <input
      type="hidden"
      name="X-Amz-Signature"
      value="5e1fd1320a7d0b001275718a680f7c6d74343b40aecf9af5c16fd6a532144584"
    />
    File:
    <input type="file" name="file" /> <br />
    <input type="submit" name="submit" value="Upload to Tigris" />
  </form>
</section>
