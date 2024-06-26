// components/MyComponent.vue
<template>
  <!-- your template here -->
  <div>
    <p :key="i" v-for="(item, i) in items">{{ item.nama }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    }
  },
  async mounted() {
    const {
      $firebase: { firestore },
    } = this
    const organisasiCollection = await firestore.getCollection('Organisasi')
    organisasiCollection.forEach((item) => {
      console.log(item.id, '=>', item)
    })
    this.items = organisasiCollection
  },
}
</script>
