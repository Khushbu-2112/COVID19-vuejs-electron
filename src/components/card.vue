<template>
  <div class="card bg-light">
    <div class="card-body text-center">
      <p class="display-4 mb-0">{{cases}}</p>
      <h5 class="text-muted">{{title}}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["cases", "title"]
};
</script>