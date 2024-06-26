<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-5">
          <v-form @submit.prevent="addOrUpdateOrganisasi">
            <v-text-field
              v-model="newOrganisasi.nama"
              label="Nama"
              placeholder="Nama"
              outlined
              dense
              class="mb-4"
            />
            <v-text-field
              v-model="newOrganisasi.instansi"
              label="Instansi"
              placeholder="Instansi"
              outlined
              dense
              class="mb-4"
            />
            <v-text-field
              v-model.number="newOrganisasi.jumlah_anggota"
              label="Jumlah Anggota"
              placeholder="Jumlah Anggota"
              type="number"
              outlined
              dense
              class="mb-4"
            />
            <v-btn type="submit" color="primary" class="mr-2">
              {{ editMode ? 'Update' : 'Add' }} Organisasi
            </v-btn>
            <v-btn v-if="editMode" @click="cancelEdit" color="secondary">
              Cancel
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-6">
      <v-col cols="12" md="10">
        <v-card>
          <v-card-title class="font-semibold text-lg"
            >Organisasi List</v-card-title
          >
          <v-divider></v-divider>
          <v-simple-table dense>
            <thead>
              <tr>
                <th class="text-left">Nama</th>
                <th class="text-left">Instansi</th>
                <th class="text-left">Jumlah Anggota</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="organisasi in organisasiList" :key="organisasi.id">
                <td>{{ organisasi.nama }}</td>
                <td>{{ organisasi.instansi }}</td>
                <td>{{ organisasi.jumlah_anggota }}</td>
                <td>
                  <v-btn
                    small
                    @click="editOrganisasi(organisasi)"
                    class="mr-2"
                    color="info"
                    >Edit</v-btn
                  >
                  <v-btn
                    small
                    @click="deleteOrganisasi(organisasi.id)"
                    color="error"
                    >Delete</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      newOrganisasi: {
        id: '',
        nama: '',
        instansi: '',
        jumlah_anggota: 0,
      },
      organisasiList: [],
      editMode: false,
    }
  },
  async created() {
    await this.fetchOrganisasi()
  },
  methods: {
    async fetchOrganisasi() {
      try {
        this.organisasiList = await this.$firebase.firestore.getCollection(
          'Organisasi'
        )
      } catch (error) {
        console.error('Error fetching documents: ', error)
      }
    },
    async addOrUpdateOrganisasi() {
      try {
        if (
          !this.newOrganisasi.nama ||
          !this.newOrganisasi.instansi ||
          this.newOrganisasi.jumlah_anggota <= 0
        ) {
          alert('Please fill all fields correctly.')
          return
        }

        if (this.editMode) {
          await this.$firebase.firestore.updateDoc(
            'Organisasi',
            this.newOrganisasi.id,
            {
              nama: this.newOrganisasi.nama,
              instansi: this.newOrganisasi.instansi,
              jumlah_anggota: this.newOrganisasi.jumlah_anggota,
            }
          )
        } else {
          await this.$firebase.firestore.addDoc('Organisasi', {
            nama: this.newOrganisasi.nama,
            instansi: this.newOrganisasi.instansi,
            jumlah_anggota: this.newOrganisasi.jumlah_anggota,
          })
        }

        this.resetForm()
        await this.fetchOrganisasi() // Refresh the list
      } catch (error) {
        console.error('Error adding/updating document: ', error)
        alert('Failed to add/update organisasi.')
      }
    },
    async deleteOrganisasi(id) {
      try {
        await this.$firebase.firestore.deleteDoc('Organisasi', id)
        await this.fetchOrganisasi() // Refresh the list
      } catch (error) {
        console.error('Error deleting document: ', error)
        alert('Failed to delete organisasi.')
      }
    },
    editOrganisasi(organisasi) {
      this.newOrganisasi = { ...organisasi }
      this.editMode = true
    },
    cancelEdit() {
      this.resetForm()
    },
    resetForm() {
      this.newOrganisasi = {
        id: '',
        nama: '',
        instansi: '',
        jumlah_anggota: 0,
      }
      this.editMode = false
    },
  },
}
</script>

<style scoped>
</style>
