<template>
  <form @submit.prevent="addOrganisasi">
    <input v-model="newOrganisasi.nama" placeholder="Nama" />
    <input v-model="newOrganisasi.instansi" placeholder="Instansi" />
    <input
      v-model.number="newOrganisasi.jumlah_anggota"
      placeholder="Jumlah Anggota"
    />
    <button type="submit">Add Organisasi</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      newOrganisasi: {
        nama: '',
        instansi: '',
        jumlah_anggota: 0,
      },
    }
  },
  methods: {
    async addOrganisasi() {
      try {
        if (
          !this.newOrganisasi.nama ||
          !this.newOrganisasi.instansi ||
          this.newOrganisasi.jumlah_anggota <= 0
        ) {
          alert('Please fill all fields correctly.')
          return
        }

        const {
          $firebase: { firestore },
        } = this


        const collectionRef = firestore.collection('Organisasi')
        await firestore.addDoc(collectionRef, {
          nama: this.newOrganisasi.nama,
          instansi: this.newOrganisasi.instansi,
          jumlah_anggota: this.newOrganisasi.jumlah_anggota,
        })

        this.newOrganisasi.nama = ''
        this.newOrganisasi.instansi = ''
        this.newOrganisasi.jumlah_anggota = 0
      } catch (error) {
        console.error('Error adding document: ', error)
        alert('Failed to add organisasi.')
      }
    },
  },
}
</script>
